
import cloudinary from "../config/cloudinary.js";


// ==========================
// UPLOAD IMAGE
// ==========================

export const uploadImage = async (
  req,
  res
) => {

  try {

    // ==========================
    // CHECK FILE
    // ==========================

    if (!req.file) {

      return res.status(400).json({

        message:
          "Please select an image",

      });

    }


    // ==========================
    // UPLOAD TO CLOUDINARY
    // ==========================

    const result =
      await new Promise(
        (resolve, reject) => {

          const stream =
            cloudinary.uploader.upload_stream(

              {
                folder:
                  "electromart/products",

                resource_type:
                  "image",

              },

              (error, result) => {

                if (error) {

                  reject(error);

                } else {

                  resolve(result);

                }

              }

            );


          stream.end(
            req.file.buffer
          );

        }
      );


    // ==========================
    // RESPONSE
    // ==========================

    res.status(200).json({

      message:
        "Image uploaded successfully",

      imageUrl:
        result.secure_url,

    });


  } catch (error) {

    console.error(
      "Upload Image Error:",
      error
    );


    res.status(500).json({

      message:
        "Image upload failed",

      error:
        error.message,

    });

  }

};
