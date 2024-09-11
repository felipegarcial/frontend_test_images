import { Image } from "../types";

export const fetchImages = async (page: number, search: string) => {
  const url = search
    ? `http://localhost:3100/images?page=${page}&search=${search}`
    : `http://localhost:3100/images?page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error fetching images");
  }
  const data = await response.json();

  const filteredData = search
    ? data.filter((image: Image) =>
        image.title.toLowerCase().includes(search.toLowerCase()) || image.author.toLowerCase().includes(search.toLowerCase())
      )
    : data;

    console.log(filteredData);
  return filteredData;
};

export const likeImage = async (id: number) => {
  await fetch(`http://localhost:3100/images/${id}/likes`, {
    method: "POST",
  });
};
