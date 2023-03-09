import { Card, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

export default function CompanySettings() {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <Card className=" col-span-12 lg:col-span-8 max-w-3xl ">
      <form
        //   onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-8 space-y-6 px-6"
      >
        <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
          <TextField
            {...register("name", {
              required: true,
            })}
            id="outlined-adornment-name"
            label="Nombre de la Empresa"
            size="medium"
            error={errors.name && "value"}
            className="input-rounded"
            helperText={errors.name && `El campo no es valido`}
            variant="outlined"
            fullWidth
          />
          <TextField
            {...register("email", {
              required: true,
            })}
            id="outlined-adornment-name"
            label="Correo"
            size="medium"
            error={errors.email && "value"}
            className="input-rounded"
            helperText={errors.email && `El campo no es valido`}
            variant="outlined"
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <EmailOutlined
            //         className={`${errors.email && "text-red-500"} `}
            //       />
            //     </InputAdornment>
            //   ),
            // }}
            fullWidth
          />
        </div>
        <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
          <TextField
            {...register("phone", { required: true })}
            id="outlined-adornment-phone"
            label="Numero de telefono"
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.phone}
            helperText={errors.phone && `El campo no es valido`}
            fullWidth
          />
          <TextField
            {...register("address", { required: true })}
            id="outlined-adornment-phone"
            label="Direccion"
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.address}
            helperText={errors.address && `El campo no es valido`}
            fullWidth
          />
        </div>
        <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
          <TextField
            {...register("website")}
            id="outlined-adornment-phone"
            label="Sitio electronico"
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            fullWidth
          />
          <TextField
            {...register("noIdentification", { required: true })}
            id="outlined-adornment-phone"
            label="Numero de identificacion"
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.noIdentification}
            helperText={errors.noIdentification && `El campo no es valido`}
            fullWidth
          />
        </div>
        <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
          <TextField
            {...register("ncf", { required: true })}
            id="outlined-adornment-phone"
            label="Numero de comprobante fiscal"
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.ncf}
            helperText={errors.ncf && `El campo no es valido`}
            fullWidth
          />
          <TextField
            {...register("currencyId")}
            id="outlined-adornment-phone"
            label="Moneda"
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.currencyId}
            helperText={errors.currencyId && `El campo no es valido`}
            fullWidth
          />
        </div>

        <div className="flex w-full justify-end space-x-4 ">
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="medium"
            className=" w-28 "
          >
            Guardar
          </Button>
        </div>
      </form>
    </Card>
  );
}
