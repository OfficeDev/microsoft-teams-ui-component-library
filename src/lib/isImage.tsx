const isImage = (url: string) =>
  new Promise((resolve, reject) => {
    // check that is a valid url
    // then if valid url
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });

export const isImageOrNot = (input: string) =>
  new Promise((resolve) => {
    if (/(jpg|gif|png|jpeg|svg|webp)$/i.test(input)) {
      isImage(input).then(
        (value: unknown): void => {
          if (
            (value as any).path[0].width > 0 &&
            (value as any).path[0].height
          ) {
            resolve();
          } else {
            throw new Error(
              `Fail to process the image by the following link: ${input} \n Image size is 0`
            );
          }
        },
        () => {
          throw new Error(
            `Fail to process the image by the following link: ${input}`
          );
        }
      );
    } else {
      throw new Error(
        `Failed to upload image: ${input} \n Image format not supported, supported formats: JPG, JPEG, GIF, PNG, SVG, WEBP`
      );
    }
  });
