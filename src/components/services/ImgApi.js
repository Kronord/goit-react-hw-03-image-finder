const AUTH_TOKEN = '24785133-c86d5320aa8a1ff21d6ab9e5f';
export default async function apiService(name, page) {
  return await fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${AUTH_TOKEN}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
