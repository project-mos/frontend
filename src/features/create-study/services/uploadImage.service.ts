export const uploadImage = async (file: File): Promise<string> => {
  // example function
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "STUDY");

  const res = await fetch("/recruitment-images", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("이미지 업로드 실패");
  }

  const data = await res.json();
  return data.imageUrl;
};
