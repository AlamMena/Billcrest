import { useEffect, useState } from "react";
import useAxios from "../../axios/index";
import ProductForm from "../../components/products/productForm";
import { useRouter } from "next/router";

export default function Product() {
  const [product, setProduct] = useState({});
  const { axiosInstance } = useAxios();

  const router = useRouter();
  const { id } = router.query;

  const getProductAsync = async () => {
    const { data } = await axiosInstance.get(`/product/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    getProductAsync();
  }, []);

  return <ProductForm product={product} />;
}
// export async function getServerSideProps({ params }) {
//   return {
//     props: { id: params.id },
//   };
// }
