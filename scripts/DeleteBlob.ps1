#---------------------------------------------------------------------------------
# Delete Blob
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
    [String]$ResourceGroupName,
    [Parameter(Mandatory = $true)]
    [Alias('Name')]
    [String]$BlobName
)

#Check if Windows Azure PowerShell Module is avaliable
If ((Get-Module -ListAvailable Azure) -eq $null) {
    Write-Warning "Windows Azure PowerShell module not found! Please install from http://www.windowsazure.com/en-us/downloads/#cmd-line-tools"
}
Else {
    If ($ResourceGroupName -and $StorageAccountName) {
        Get-AzureRmStorageAccount -ResourceGroupName $ResourceGroupName -StorageAccountName $StorageAccountName -ErrorAction SilentlyContinue `
            -ErrorVariable IsExistStorageError | Out-Null
        #Check if storage account is exist
        If ($IsExistStorageError.Exception -eq $null) {
            #Getting Azure storage account key
            $Keys = Get-AzureRmStorageAccountKey -ResourceGroupName $ResourceGroupName -StorageAccountName $StorageAccountName
            $StorageAccountKey = $Keys.Value[0]
        }
        Else {
            Write-Error "Cannot find storage account '$StorageAccountName' in resource group '$ResourceGroupName' because it does not exist. Please make sure thar the name of storage is correct."
        }
    }

    If ($ContainerName) {
        $StorageContext = New-AzureStorageContext -StorageAccountName $StorageAccountName -StorageAccountKey $StorageAccountKey
        Get-AzureStorageContainer -Context $StorageContext -Name $ContainerName -ErrorAction SilentlyContinue `
            -ErrorVariable IsExistContainerError | Out-Null
        #Check if container is exist
        If ($IsExistContainerError.Exception -eq $null) {
            Write-Warning "Deleting blob with prefix '$BlobName'"
            Get-AzureStorageBlob -Context $StorageContext -Container $ContainerName -Prefix $BlobName -ContinuationToken $Token | Remove-AzureStorageBlob -Force -WhatIf
        }
        Else {
            Write-Warning "Cannot find container '$ContainerName' because it does not exist. Please make sure thar the name of container is correct."
        }
    }
}
