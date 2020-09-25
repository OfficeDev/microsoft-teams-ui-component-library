#---------------------------------------------------------------------------------
# Update Blob Cache Control and Content Type
#---------------------------------------------------------------------------------

#requires -Version 3.0

<#
 	.SYNOPSIS
       This script can be used to change the content type of multiple/single file/s.                               .
    .DESCRIPTION
       This script is designed to change the content type of multiple/single file/s located in an Azure container
    .PARAMETER  ContainerName
		Specifies the name of container.
	.PARAMETER  StorageAccountName
		Specifies the name of the storage account to be connected.
    .PARAMETER  ResourceGroupName
		Specifies the name of the resource group to be connected.
	.EXAMPLE
        C:\PS> C:\Script\UpdateContentTypes.ps1 -ResourceGroupName "ResourceGroup01" -StorageAccountName "AzureStorage01" -ContainerName "pics"

#>

Param
(
    [Parameter(Mandatory = $true)]
    [Alias('CN')]
    [String]$ContainerName,
    [Parameter(Mandatory = $true)]
    [Alias('SN')]
    [String]$StorageAccountName,
    [Parameter(Mandatory = $true)]
    [Alias('RGN')]
    [String]$ResourceGroupName
)

#Check if Windows Azure PowerShell Module is avaliable
If((Get-Module -ListAvailable Azure) -eq $null)
{
    Write-Warning "Windows Azure PowerShell module not found! Please install from http://www.windowsazure.com/en-us/downloads/#cmd-line-tools"
}
Else
{
    If($ResourceGroupName -and $StorageAccountName) {
        Get-AzureRmStorageAccount -ResourceGroupName $ResourceGroupName -StorageAccountName $StorageAccountName -ErrorAction SilentlyContinue `
        -ErrorVariable IsExistStorageError | Out-Null
        #Check if storage account is exist
        If($IsExistStorageError.Exception -eq $null) {
            #Getting Azure storage account key
            $Keys = Get-AzureRmStorageAccountKey -ResourceGroupName $ResourceGroupName -StorageAccountName $StorageAccountName
            $StorageAccountKey = $Keys.Value[0]
        } Else {
            Write-Error "Cannot find storage account '$StorageAccountName' in resource group '$ResourceGroupName' because it does not exist. Please make sure thar the name of storage is correct."
        }
    }

    If($ContainerName) {
        $StorageContext = New-AzureStorageContext -StorageAccountName $StorageAccountName -StorageAccountKey $StorageAccountKey
        Get-AzureStorageContainer -Context $StorageContext -Name $ContainerName -ErrorAction SilentlyContinue `
        -ErrorVariable IsExistContainerError | Out-Null
        #Check if container is exist
        If($IsExistContainerError.Exception -eq $null)
        {
            $Total = 0
            $Token = $NULL
            #Results are grouped in 10 000 (this number works very well with azure)
            $MaxReturn = 10000
            do
            {
                $BlobItems = Get-AzureStorageBlob -Context $StorageContext -Container $ContainerName -MaxCount $MaxReturn  -ContinuationToken $Token
                Foreach($BlobItem in $BlobItems)
                {
                    Try
                    {
                        $BlobName = $BlobItem.Name
                        $blobext = [System.IO.Path]::GetExtension($BlobName)
                        $blobext = $blobext.ToLower()
                        $blobpath = [System.IO.Path]::GetDirectoryName($BlobName)
                        $blobpath = $blobpath.ToLower()

                        #You can add or remove more content typs if need be, the defult of none makes sure that nothing get's changed if extension is not matched
                        switch ($blobext) {
                            ".jpg" {$DesiredContentType = "image/jpeg"}
                            ".jpeg" {$DesiredContentType = "image/jpeg"}
                            ".jpe" {$DesiredContentType = "image/jpeg"}
                            ".gif" {$DesiredContentType = "image/gif"}
                            ".png" {$DesiredContentType = "image/png"}
                            ".svg" {$DesiredContentType = "image/svg+xml"}
                            ".eot" {$DesiredContentType = "application/vnd.ms-fontobject"}
                            ".ttf" {$DesiredContentType = "application/x-font-ttf"}
                            ".woff" {$DesiredContentType = "application/font-woff"}
                            ".woff2" {$DesiredContentType = "application/font-woff2"}
                            ".html" {$DesiredContentType = "text/html"}
                            ".js" {$DesiredContentType = "application/javascript"}
                            ".css" {$DesiredContentType = "text/css"}
                            default {$DesiredContentType = "none"}
                         }

                         switch ($blobpath) {
                             "hashed" {$DesiredCacheControl = "public, max-age=31536000"}
                             default {$DesiredCacheControl = "public, max-age=3600"}
                         }

                         Write-Output "'$BlobName' - Has path '$blobpath' and extension '$blobext'."
                         $CloudBlob = $BlobItem.ICloudBlob
                         $Updated = $FALSE
                         if ($DesiredContentType -ne "none") {
                            $CurrentContentType = $CloudBlob.Properties.ContentType
                            Write-Output "'$BlobName' - Has content type '$CurrentContentType'."
                            if (-not $DesiredContentType.Equals($CurrentContentType, 3)) {
                                $CloudBlob.Properties.ContentType = $DesiredContentType
                                $Updated = $TRUE
                                Write-Output "'$BlobName' - Changing content type to '$DesiredContentType'."
                            } Else {
                                Write-Information "'$BlobName' - Already has content type '$DesiredContentType'."
                            }
                        } Else {
                            Write-Warning "'$BlobName' - Extension '$blobext' does not have a mapping."
                        }

                        if ($DesiredCacheControl -ne "none") {
                            $CloudBlob = $BlobItem.ICloudBlob
                            $CurrentCacheControl = $CloudBlob.Properties.CacheControl
                            Write-Output "'$BlobName' - Has cache control '$CurrentCacheControl'."

                            if (-not $DesiredCacheControl.Equals($CurrentCacheControl, 3)) {
                                $CloudBlob.Properties.CacheControl = $DesiredCacheControl
                                $Updated = $TRUE
                                Write-Output "'$BlobName' - Changing cache control to '$DesiredCacheControl'."
                            } Else {
                                Write-Information "'$BlobName' - Already has cache control '$DesiredCacheControl'."
                            }
                        } Else {
                            Write-Warning "'$BlobName' - Does not have a desired cache control setting."
                        }

                        if ($Updated) {
                            $CloudBlob.SetProperties()
                            Write-Information "'$BlobName' - Saved Successfully."
                        }
                    }
                    Catch {
                        $ErrorMessage = $_.Exception.Message
                        Write-Error "Failed to change content type of '$BlobName'. Error: '$ErrorMessage'"
                    }
                }
                $Total += $BlobItems.Count
                if($BlobItems.Length -le 0) { Break;}
                $Token = $BlobItems[$BlobItems.Count -1].ContinuationToken;
            }
            While ($Token -ne $Null)
        }
        Else
        {
            Write-Warning "Cannot find container '$ContainerName' because it does not exist. Please make sure thar the name of container is correct."
        }
    }
}
