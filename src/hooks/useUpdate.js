export async function useUpdate(url, params){
     
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params), 
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Error server');
      }
      const result = await response.json();
      console.log('Datas uptaded successfully', result);
    } catch (error) {
      console.error('Error updating datas:', error);
    }
  };