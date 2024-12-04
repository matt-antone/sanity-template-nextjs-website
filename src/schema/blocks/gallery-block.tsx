import { Box as SanityBox, Grid } from "@sanity/ui";
import urlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";
const urlFor = (source: any) => urlBuilder(client).image(source);

export const galleryBlock = {
  name: "galleryBlock",
  title: "Gallery Block",
  type: "object",
  fields: [
    {
      type: "array",
      name: "images",
      title: "Images",
      description: "Add a gallery of images.",
      of: [{ type: "image" }],
      preview: {
        select: {
          asset: "asset",
        },
      },
    },
  ],
  components: {
    block: (props: any) => {
      return props.renderDefault({
        ...props,
        renderPreview: () => {
          const images = props?.value?.images || [];
          return (
            <SanityBox padding={2}>
              <p>Gallery Block</p>
              {images?.length > 0 ? (
                <Grid columns={[2, 3]} gap={[1, 1, 2, 3]} padding={4}>
                  {images?.map((image: any) => {
                    return image.asset ? (
                      <img
                        key={image?._key}
                        src={urlFor(image).width(150).height(150).url()}
                        alt={image.altText || image.alt || ""}
                        width={150}
                        height={150}
                      />
                    ) : (
                      <p>Please select an image.</p>
                    );
                  })}
                </Grid>
              ) : (
                <p>Please add some images.</p>
              )}
            </SanityBox>
          );
        },
      });
    },
  },
};
