import imageCompression from 'browser-image-compression';
import { FormLabel } from './FormLabel';

export function WriteUpload({ image, setImage, preview, setPreview, label, required }) {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {

      const options = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 500,
      };
      imageCompression(file, options).then((compressedFile) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
  
          img.onload = () => {
            // Redimensionnement à 500x500
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
  
            // Si l'image dépasse les dimensions 500x500, on la découpe
            const width = img.width > 500 ? 500 : img.width;
            const height = img.height > 500 ? 500 : img.height;
            
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
  
            // Convertir l'image découpée en Base64
            const base64Image = canvas.toDataURL('image/png');
            setImage(base64Image); 
            setPreview(base64Image); 
          };
        };
  
        reader.readAsDataURL(compressedFile); // Commence la lecture du fichier
      });
    }
  };


  return (
    <>
    <FormLabel label={label} required={required}/>

    <div className="relative flex items-center w-full gap-4">
      <div className="min-h-[80px] min-w-[80px] h-[80px] w-[80px] overflow-hidden rounded-md">
        <img
          src={preview ? preview : "/img/icons/upload_slate.png"}
          className="h-full w-full object-cover"
        ></img>
      </div>
      <label
        htmlFor="image"
        className="cursor-pointer font-medium px-4 py-2 bg-myviolet text-white rounded-md hover:bg-violet-600 focus:ring-2 focus:ring-violet-400 focus:outline-none"
      >
        Upload Image
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="/image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
    </>
  );
}
