import imageCompression from 'browser-image-compression';

export function RegisterUpload({ avatar, setAvatar, preview, setPreview }) {
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      // Compression de l'image avant toute chose (optionnel)
      const options = {
        maxSizeMB: 1, // Limite la taille du fichier
        maxWidthOrHeight: 500, // Limite la taille maximale à 500px
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
  
            // Découper et redimensionner l'image pour qu'elle fasse 500x500
            ctx.drawImage(img, 0, 0, width, height);
  
            // Convertir l'image découpée en Base64
            const base64Image = canvas.toDataURL('image/png');
            setAvatar(base64Image); // Mettre à jour l'état avec l'image découpée
            setPreview(base64Image); // Pour l'aperçu
          };
        };
  
        reader.readAsDataURL(compressedFile); // Commence la lecture du fichier
      });
    }
  };


  return (
    <div className="relative flex items-center w-full py-1 gap-4">
      <div className="min-h-[80px] min-w-[80px] h-[80px] w-[80px] overflow-hidden rounded-md">
        <img
          src={preview ? preview : "/img/users/avatar.png"}
          className="h-full w-full object-cover"
        ></img>
      </div>
      <label
        htmlFor="avatar"
        className="cursor-pointer font-medium px-4 py-2 bg-myviolet text-white rounded-md hover:bg-violet-600 focus:ring-2 focus:ring-violet-400 focus:outline-none"
      >
        Upload Avatar
      </label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="/image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
