import {
  Button,
  TextField,
  Autocomplete,
  InputAdornment,
  FormControl,
  FormControlLabel,
  Switch,
  Card,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  AttachMoneyRounded,
  Inventory2Rounded,
  PercentOutlined,
} from "@mui/icons-material";
import useAxios from "../../axios/index";
import { useRouter } from "next/router";
import { debounce } from "../../utils/methods";
import PageHeader from "../globals/pageHeader";
import { useTranslation } from "react-i18next";
export default function ProductsForm({ product }) {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...product,
      category: { id: 0, name: "" },
      subcategory: { id: 0, name: "" },
      brand: { id: 0, name: "" },
      warehouse: { id: 0, name: "" },
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const { t } = useTranslation();

  // selected categories

  const { axiosInstance } = useAxios();
  const toastId = useRef(null);

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        category: {
          id: product.categoryId,
          name: product.categoryName ?? "",
        },
        subcategory: {
          id: product.subcategoryId,
          name: product.subCategoryName ?? "",
        },
        brand: { id: product.brandId, name: product.brandName ?? "" },
        warehouse: {
          id: product.warehouseId,
          name: product.warehouseName ?? "",
        },
      });
    }
  }, [product]);

  const router = useRouter();

  const handlePriceChange = (e) => {
    const currentProduct = getValues();
    const { price, cost } = currentProduct;
    let marginBenefit;
    if (e.target.id === "input-price") {
      marginBenefit = parseFloat(
        ((e.target.value - cost) / e.target.value) * 100
      ).toFixed(2);
      reset({
        ...currentProduct,
        price: e.target.value,
        marginBenefit,
      });
    }
    if (e.target.id === "input-cost") {
      marginBenefit = parseFloat(
        ((price - e.target.value) / price) * 100
      ).toFixed(2);
      reset({
        ...currentProduct,
        cost: e.target.value,
        marginBenefit,
      });
    }
  };

  const formatData = (data) => {
    return {
      ...data,
      categoryId: data.category.id,
      subcategoryId: data.subcategory.id,
      warehouseId: data.warehouse.id === 0 ? 1 : data.warehouse.id,
      brandId: data.brand.id,
      images: [],
      abName: "",
    };
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      toastId.current = toast(t("loading"), {
        type: toast.TYPE.LOADING,
      });
      const formatedData = formatData(data);
      data.id
        ? await axiosInstance.put("/product", formatedData)
        : await axiosInstance.post("/product", formatedData);

      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: t("productCreated"),
      });

      router.push("/productos");
    } catch (error) {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        render:
          error.response.data.status === 400
            ? error.response.data.message
            : t("error"),
      });
    }
    setIsLoading(false);
  };

  const getCategoriesAsync = async () => {
    const queryFilters = `page=${1}&limit=${100}`;
    const { data: apiResponse } = await axiosInstance.get(
      `categories?${queryFilters}`
    );
    setCategories(apiResponse.data);
  };
  const handleSearchCategories = debounce((e) =>
    getCategoriesAsync(e.target.value)
  );
  const getBrandsAsync = async () => {
    const queryFilters = `page=${1}&limit=${100}`;
    const { data: apiResponse } = await axiosInstance.get(
      `brands?${queryFilters}`
    );
    setBrands(apiResponse.data);
  };
  const handleSearchBrands = debounce((e) => getBrandsAsync(e.target.value));

  const getSubcategoriesAsync = async () => {
    const queryFilters = `page=${1}&limit=${100}`;
    const { data: apiResponse } = await axiosInstance.get(
      `subcategories?${queryFilters}`
    );
    setSubcategories(apiResponse.data);
    console.log(apiResponse.data);
  };
  const handleSearchSubcategories = debounce((e) =>
    getSubcategoriesAsync(e.target.value)
  );
  const getWarehousesAsync = async () => {
    const queryFilters = `page=${1}&limit=${100}`;
    const { data: apiResponse } = await axiosInstance.get(
      `warehouses?${queryFilters}`
    );
    setWarehouses(apiResponse.data);
  };
  const handleSearchWarehouses = debounce((e) =>
    getWarehousesAsync(e.target.value)
  );
  const locationRoutes = [
    {
      text: t("nav.home"),
      link: "/",
    },
    {
      text: t("nav.products"),
      link: "/productos",
    },
  ];

  useEffect(() => {
    getSubcategoriesAsync();
    getWarehousesAsync();
    getBrandsAsync();
    getCategoriesAsync();
  }, []);
  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div>
          <PageHeader
            header={t("nav.products")}
            locationRoutes={locationRoutes}
            Icon={<Inventory2Rounded className="text-green-400" />}
          />
        </div>
        <div className="grid grid-cols-12 gap-x-8 space-y-4 mb-16">
          <Card className="col-span-12 lg:col-span-8 p-8 space-y-6  h-min">
            <div className="flex flex-col mx-2 space-y-1">
              <span className="font-bold tracking-wider">
                {t("generalInfo")}
              </span>
              <span className="text-sm text-neutral-500">{t("enterInfo")}</span>
            </div>
            <TextField
              {...register("name", { required: true })}
              className="input-rounded"
              label={t("name")}
              placeholder={t("productNamePlaceh")}
              fullWidth
              error={errors.name}
              InputLabelProps={{
                shrink: true,
              }}
              helperText={errors.name && t("inputValid")}
            />
            <TextField
              {...register("description")}
              className="input-rounded w-full outline-2 outline-slate-500"
              minRows={4}
              placeholder={t("productDes")}
              multiline
              label={t("description")}
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.description}
              helperText={errors.description && t("inputValid")}
              fullWidth
            />
            {/* image list */}
            <div className="space-y-6 rounded-xl h-min">
              <div className="flex flex-col mx-2 space-y-1">
                <span className="font-bold tracking-wider">
                  {t("monetaryInfo")}
                </span>
                <span className="text-sm text-neutral-500">
                  {t("enterMonetaryInfo")}
                </span>
              </div>

              <TextField
                {...register("cost", { required: true })}
                className="input-rounded"
                type="number"
                id="input-cost"
                disabled={product && false}
                error={errors.cost}
                helperText={errors.cost && t("inputValid")}
                onChange={handlePriceChange}
                InputLabelProps={{
                  shrink: true,
                }}
                label={t("cost")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyRounded
                        className={`${errors.cost && "text-red-500"} `}
                      />
                    </InputAdornment>
                  ),
                }}
                placeholder="0.00"
                fullWidth
              />
              <TextField
                {...register("price", { required: true })}
                className="input-rounded"
                type="number"
                id="input-price"
                disabled={product && false}
                label={t("price")}
                error={errors.price}
                helperText={errors.price && t("inputValid")}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handlePriceChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyRounded
                        className={`${errors.price && "text-red-500"} `}
                      />
                    </InputAdornment>
                  ),
                }}
                placeholder="0.00"
                fullWidth
              />
              <TextField
                {...register("marginBenefit")}
                className="input-rounded"
                disabled
                label={t("profitMargin")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PercentOutlined />
                    </InputAdornment>
                  ),
                }}
                placeholder="0.00"
                fullWidth
              />
            </div>
          </Card>

          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Card className=" p-8 space-y-6  h-min">
              <div className="flex flex-col mx-2 space-y-1">
                <span className="font-bold tracking-wider">
                  {t("detailedInfo")}
                </span>
                <span className="text-sm text-neutral-500">
                  {t("enterDetailed")}
                </span>
              </div>
              <FormControlLabel
                className="text-xs"
                control={<Switch defaultChecked />}
                label={t("available")}
              />
              <TextField
                {...register("barCode", { required: true })}
                className="input-rounded"
                label={t("code")}
                error={errors.barCode}
                helperText={errors.barCode && t("inputValid")}
                InputLabelProps={{ shrink: true }}
                placeholder="P001-C001"
                fullWidth
              />
              <FormControl fullWidth>
                <Controller
                  rules={{ require: true }}
                  render={({
                    field: { ref, onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      {...field}
                      options={categories}
                      disableClearable
                      onChange={(_, data) => {
                        onChange(data);
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="input-rounded"
                          error={error != undefined}
                          onChange={handleSearchCategories}
                          inputRef={ref}
                          helperText={error && t("inputValid")}
                          label={t("category")}
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                  name="category"
                  control={control}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  rules={{ require: true }}
                  render={({
                    field: { ref, onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      {...field}
                      options={subCategories}
                      disableClearable
                      onChange={(_, data) => {
                        onChange(data);
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="input-rounded"
                          error={error != undefined}
                          onChange={handleSearchSubcategories}
                          inputRef={ref}
                          helperText={error && t("inputValid")}
                          label={t("subCategory")}
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                  name="subcategory"
                  control={control}
                />
              </FormControl>{" "}
              <FormControl fullWidth>
                <Controller
                  rules={{ require: true }}
                  render={({
                    field: { ref, onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      {...field}
                      options={brands}
                      disableClearable
                      onChange={(_, data) => {
                        onChange(data);
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="input-rounded"
                          error={error != undefined}
                          onChange={handleSearchBrands}
                          inputRef={ref}
                          helperText={error && t("inputValid")}
                          label={t("nav.brands")}
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                  name="brand"
                  control={control}
                />
              </FormControl>
            </Card>
            <Card className=" p-8 space-y-6  h-min">
              <div className="flex flex-col mx-2 space-y-1">
                <span className="font-bold tracking-wider">
                  {t("detailedInfo")}
                </span>
                <span className="text-sm text-neutral-500">
                  {t("enterDetailed")}
                </span>
              </div>
              {!product && (
                <FormControl fullWidth>
                  <Controller
                    rules={{ require: true }}
                    render={({
                      field: { ref, onChange, ...field },
                      fieldState: { error },
                    }) => (
                      <Autocomplete
                        {...field}
                        options={warehouses}
                        disableClearable
                        onChange={(_, data) => {
                          onChange(data);
                        }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className="input-rounded"
                            error={error != undefined}
                            onChange={handleSearchWarehouses}
                            inputRef={ref}
                            helperText={error && t("inputValid")}
                            label={t("warehouse")}
                            variant="outlined"
                          />
                        )}
                      />
                    )}
                    name="warehouse"
                    control={control}
                  />
                </FormControl>
              )}

              <TextField
                {...register("stock", { required: true })}
                disabled={product && true}
                className="input-rounded"
                error={errors.stock}
                helperText={errors.stock && t("inputValid")}
                label={t("quantityProduct")}
                placeholder="120"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Card>
            <div className="flex justify-center">
              <Button
                className=" w-full max-w-xl shadow-lg text-white z-auto rounded-xl py-2 bg-green-600 hover:bg-green-700"
                size="medium"
                type="submit"
                color="primary"
                disabled={isLoading}
                variant="contained"
              >
                {t("save")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
