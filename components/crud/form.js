import { useEffect, useState } from "react";
import {
  Dialog,
  Divider,
  FormControl,
  TextField,
  Button,
  Autocomplete,
  DialogActions,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useAxios from "../../axios/index";
import { useTranslation } from "react-i18next";
import { debounce } from "../../utils/methods";

export default function Form({
  onSave,
  open,
  setOpen,
  data,
  fields,
  formatAutoComplete,
  formatApiResult,
  headerText,
  icon,
}) {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });
  const { t } = useTranslation();

  const [catalog, setCatalog] = useState([]);
  const onSubmit = async (data) => {
    let parsedData = data;
    if (formatAutoComplete) {
      parsedData = formatAutoComplete(parsedData);
    }
    await onSave(parsedData);
    // alert(JSON.stringify(data));
  };

  const { axiosInstance } = useAxios();

  const getCatalogAsync = async (catalogName, filter) => {
    const queryFilters = `page=${1}&limit=${100}&value=${filter}`;
    const { data: apiResponse } = await axiosInstance.get(
      `${catalogName}?${queryFilters}`
    );
    let catalog = apiResponse.data;
    setCatalog(
      catalog.map((item) => {
        return { id: item.id, name: item.name };
      })
    );
  };
  const onInputCatalogFilterChange = debounce((catalogName, filter) =>
    getCatalogAsync(catalogName, filter)
  );

  useEffect(() => {
    let parsedData = data;

    if (formatApiResult) {
      parsedData = formatApiResult(data);
    }
    reset(parsedData);
  }, [data]);

  return (
    <div className="w-full h-full">
      <div className=" rounded-2xl ">
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            style: { borderRadius: 15 },
          }}
          maxWidth="sm"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-6 space-y-5 px-10"
          >
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-neutral-100 rounded-full p-2">{icon}</div>
                <h2 className="text-xl font-bold ml-2">{headerText} </h2>
              </div>
              <span className="text-sm text-black text-opacity-50">
                {t("formPhrase")}
              </span>
              <Divider className="mt-4" />
            </div>

            {fields.map((item, index) => {
              if (item.type === "autocomplete") {
                return (
                  <FormControl fullWidth key={index}>
                    <Controller
                      rules={{ require: true }}
                      render={({
                        field: { ref, onChange, ...field },
                        fieldState: { error },
                      }) => (
                        <Autocomplete
                          {...field}
                          options={catalog}
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
                              onChange={(e) =>
                                onInputCatalogFilterChange(
                                  item.catalogName,
                                  e.target.value
                                )
                              }
                              inputRef={ref}
                              helperText={error && t("inputRequired")}
                              label={item.label}
                              variant="outlined"
                            />
                          )}
                        />
                      )}
                      name="category"
                      control={control}
                    />
                  </FormControl>
                );
              }
              return (
                <Controller
                  key={index}
                  control={control}
                  name={item.name}
                  rules={item.validation}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth={field.fullWidth}
                      multiline={item.multiline}
                      minRows={item.multiline && 4}
                      label={item.label}
                      InputLabelProps={{ shrink: true }}
                      placeholder={item.placeholder}
                      className="input-rounded"
                      variant="outlined"
                      error={error}
                      helperText={error && t("inputValid")}
                      inputProps={{ maxLength: 50 }}
                    />
                  )}
                />
              );
            })}
            <DialogActions>
              <div className="flex space-x-3 justify-end w-full">
                <Button
                  type="button"
                  color="inherit"
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  size="medium"
                  className=" border-gray-300"
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="medium"
                >
                  {t("save")}
                </Button>
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
