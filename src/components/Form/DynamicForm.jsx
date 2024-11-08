import React, { useCallback, useEffect, useState } from "react";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import CustomSelect from "../Select/CustomSelect";
import { Country, State, City } from "country-state-city";
import "../../bootstrap.css";
import "./DynamicForm.css";
import UploadFile from "../UploadFile";
import FileView from "../FileView";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DynamicForm = ({ formData, onSubmit, formButtons, formId = "main" }) => {
    const [formValues, setFormValues] = useState({});
    const [maskedValues, setMaskedValues] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fieldVisibility, setFieldVisibility] = useState({});
    const [dynamicOptions, setDynamicOptions] = useState({});
    const [customFieldState, setCustomFieldState] = useState({});

    useEffect(() => {
        if (!formData) return;
        const initialValues = formData.reduce((acc, field) => {
            if (field.type === "select" && field.multiple) {
                acc[field.name] = field.defaultValue || [];
            } else {
                acc[field.name] = field.defaultValue || "";
            }
            return acc;
        }, {});

        const initialMaskedValues = formData.reduce((acc, field) => {
            acc[field.name] = field.maskedValue || field.defaultValue || "";
            return acc;
        }, {});

        setFormValues((prevValues) => ({
            ...prevValues,
            ...initialValues,
        }));

        setMaskedValues((prevValues) => ({
            ...prevValues,
            ...initialMaskedValues,
        }));

        const initialCustomFieldState = formData.reduce((acc, field) => {
            if (field.allowCustom) {
                acc[field.name] = { isCustom: field?.defaultValue ? (field.options?.some((option) => option.value === field.defaultValue) ? false : true) : false };
            }
            return acc;
        }, {});
        setCustomFieldState(initialCustomFieldState);
    }, [formData]);

    useEffect(() => {
        formData.forEach((field) => {
            if (field.dependentField) {
                setFieldVisibility((prev) => ({
                    ...prev,
                    [field.name]: formValues[field.dependentField] === field.dependentValue,
                }));
            }
        });
    }, [formValues, formData]);

    useEffect(() => {
        formData.forEach((field) => {
            if (field.type === "select" && field.dynamicOptions) {
                fetchDynamicOptions(field.name, field.dynamicOptions);
            }
        });
    }, [formData, formValues]);

    const fetchDynamicOptions = (fieldName, dynamicOptions) => {
        let options = [];
        switch (dynamicOptions.type) {
            case "country":
                options = Country.getAllCountries().map((country) => ({
                    label: country.name,
                    value: country.isoCode,
                }));
                break;
            case "state":
                if (formValues[dynamicOptions.dependentOn]) {
                    options = State.getStatesOfCountry(formValues[dynamicOptions.dependentOn]).map((state) => ({
                        label: state.name,
                        value: state.isoCode,
                    }));
                }
                break;
            case "city":
                if (formValues[dynamicOptions.dependentOnCountry] && formValues[dynamicOptions.dependentOnState]) {
                    options = City.getCitiesOfState(formValues[dynamicOptions.dependentOnCountry], formValues[dynamicOptions.dependentOnState]).map((city) => ({
                        label: city.name,
                        value: city.name,
                    }));
                }
                break;
            default:
                break;
        }

        setDynamicOptions((prevOptions) => ({
            ...prevOptions,
            [fieldName]: options,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(formValues);
        }
    };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        const updatedValues = {
            ...formValues,
            [name]: value,
        };

        if (!customFieldState[name]?.isCustom && value === "other") {
            setCustomFieldState((prevState) => ({
                ...prevState,
                [name]: { isCustom: true },
            }));
        } else {
            setCustomFieldState((prevState) => ({
                ...prevState,
                [name]: { isCustom: false },
            }));
        }

        formData.forEach((field) => {
            if (field.dynamicOptions && field.dynamicOptions.dependentOn === name) {
                updatedValues[field.name] = "";
                fetchDynamicOptions(field.name, field.dynamicOptions);
            }
        });

        setFormValues(updatedValues);
    };

    const handleInputChange = useCallback((event) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === "checkbox" ? checked : value;

        setMaskedValues({
            ...maskedValues,
            [name]: fieldValue,
        });

        const updatedValues = {
            ...formValues,
            [name]: fieldValue,
        };

        formData.forEach((field) => {
            if (field.dependentField === name) {
                setFieldVisibility((prev) => ({
                    ...prev,
                    [field.name]: fieldValue === field.dependentValue,
                }));
            }
            if (field.dynamicOptions && field.dynamicOptions.dependentOn === name) {
                fetchDynamicOptions(field.name, field.dynamicOptions);
            }

            // Handle "Same as Permanent Address" scenario
            if (name === "sameAsPermanent") {
                // Copy values from permanent address to current address fields
                const addressFields = ["permanentAddress", "permanentCountry", "permanentState", "permanentCity"];

                addressFields.forEach((field) => {
                    updatedValues[field.replace("permanent", "current")] = checked ? formValues[field] : "";
                });
            }
        });

        setFormValues(updatedValues);
    });

    const handleCustomFileChange = useCallback((data) => {
        const { name, value, updateName } = data;
        const updatedValues = {
            ...formValues,
            [name]: formValues[name] ? [...formValues[name], ...value] : value,
        };
        if (formValues[name]) {
            updatedValues[updateName] = value;
        }
        // console.log("qrewr", updatedValues?.[name]);
        setFormValues(updatedValues);
    });

    const handleFileChange = useCallback((event) => {
        const { name } = event.target;
        const selectedFiles = Array.from(event.target.files);

        const validFiles = selectedFiles.filter((file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type));

        if (validFiles.length > 0) {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: validFiles,
            }));

            const objectUrls = validFiles.map((file) => URL.createObjectURL(file));
            setPreviewUrl(objectUrls);

            return () => {
                objectUrls.forEach((url) => URL.revokeObjectURL(url));
            };
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: null,
            }));
            setPreviewUrl(null);
        }
    }, []);

    const handleLabelClick = (name) => {
        setCustomFieldState((prevState) => ({
            ...prevState,
            [name]: { isCustom: false },
        }));
    };

    return (
        <form onSubmit={handleSubmit} id={`form-${formId}`}>
            <div className="row">
                {formData.map(
                    (field, index) =>
                        (!field.dependentField || fieldVisibility[field.name]) && (
                            <div key={index} className={`col-md-${12 / field.grid} ${field.isHidden ? "d-none" : ""}`}>
                                {renderFormField(field)}
                            </div>
                        )
                )}
            </div>
            <ButtonGroup buttons={formButtons} />
        </form>
    );

    function renderFormField(field) {
        let {
            type,
            name,
            label,
            options,
            placeholder,
            required,
            accept,
            style,
            classNames = [],
            multiple = false,
            disabled = false,
            customOnChange = null,
            viewFile = null,
            show = false,
            onClick,
            allowCustom = false,
            readonly = false,
            FileViewEdit,
            updateName = null,
            deleteName = null,
        } = field;
        if (process.env.REACT_APP_DEVELOPMENT_ENV) {
            required = false;
        }
        const id = name + formId;
        if (allowCustom && customFieldState[name]?.isCustom) {
            return (
                <div className="form-group" style={style?.formGroup}>
                    <label htmlFor={id}>
                        {label} {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                        <span style={{ marginLeft: "10px", cursor: "pointer", color: "blue" }} onClick={() => handleLabelClick(name)}>
                            ( Back to Select )
                        </span>
                    </label>
                    <input
                        type="text"
                        id={id}
                        name={name}
                        value={formValues[name] || ""}
                        onChange={handleInputChange}
                        className={["form-control", ...classNames].join(" ")}
                        placeholder={placeholder || `Specify ${label}`}
                        required={required}
                        disabled={disabled}
                        style={style?.input}
                        readOnly={readonly}
                    />
                </div>
            );
        }
        switch (type) {
            case "select":
                return (
                    <div className="form-group" style={style?.formGroup}>
                        <label htmlFor={id}>
                            {label} {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                        </label>
                        <CustomSelect
                            name={name}
                            formValues={formValues}
                            handleSelectChange={handleSelectChange}
                            options={dynamicOptions[name] || options}
                            multiple={multiple}
                            required={required}
                            disabled={disabled}
                            style={style?.input}
                            classNames={classNames}
                            placeholder={placeholder || `Select ${label}`}
                        />
                        {/* {multiple ? (
                            <CustomSelect
                                name={name}
                                formValues={formValues}
                                handleSelectChange={handleSelectChange}
                                options={dynamicOptions[name] || options}
                                multiple={multiple}
                                required={required}
                                disabled={disabled}
                                style={style?.input}
                                placeholder={placeholder || `Select ${label}`}
                                classNames={classNames}
                            />
                        ) : (
                            <select
                                id={id}
                                name={name}
                                readOnly={readonly}
                                value={formValues[name] || ""}
                                onChange={(event) => {
                                    handleSelectChange(event);
                                    customOnChange && customOnChange(event);
                                }}
                                className={["form-control", ...classNames].join(" ")}
                                multiple={multiple}
                                required={required || false}
                                style={style?.input}
                                disabled={disabled}
                            >
                                <option value="">{placeholder || `Select ${label}`}</option>
                                {(dynamicOptions[name] || options).map((option, idx) => (
                                    <option key={idx} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                                {allowCustom && <option value="other">Other (please specify)</option>}
                            </select>
                        )} */}
                    </div>
                );
            case "checkbox":
                return (
                    <div className="form-check" style={style?.formGroup}>
                        <input
                            type="checkbox"
                            id={id}
                            readOnly={readonly}
                            name={name}
                            disabled={disabled}
                            checked={formValues[name] || false}
                            onChange={handleInputChange}
                            className="form-check-input"
                            style={{ ...style?.input, border: "1px solid gray" }}
                        />
                        <label htmlFor={id} className="form-check-label" style={{ marginLeft: "0.5rem" }}>
                            {label} {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                        </label>
                    </div>
                );
            case "radio":
                return (
                    <div className="form-check" style={style?.formGroup}>
                        {options &&
                            options.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        readOnly={readonly}
                                        id={`${id}-${index}`}
                                        name={name}
                                        disabled={disabled}
                                        value={option.value}
                                        checked={formValues[name] === option.value}
                                        onChange={handleInputChange}
                                        className="form-check-input"
                                        style={style?.input}
                                    />
                                    <label htmlFor={`${id}-${index}`} className="form-check-label">
                                        {option.label} {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                                    </label>
                                </div>
                            ))}
                    </div>
                );
            case "date-time":
                return (
                    <div className="form-group">
                        <label htmlFor={id}>
                            {label} {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                        </label>
                        <DatePicker
                            id={id}
                            readOnly={readonly}
                            name={name}
                            disabled={disabled}
                            style={style?.input}
                            selected={formValues[name] || ""}
                            onChange={(date) => handleInputChange({ target: { value: date, type, name } })}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </div>
                );
            case "textarea":
                return (
                    <div className="form-group">
                        <label htmlFor={id}>
                            {label} {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                        </label>
                        <textarea
                            id={id}
                            readOnly={readonly}
                            name={name}
                            disabled={disabled}
                            value={formValues[name] || ""}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder={placeholder || ""}
                            required={required || false}
                            style={style?.input}
                        />
                    </div>
                );
            case "file":
                const isInline = style?.input?.inline;
                let labelStyle = {
                    width: "100%",
                    height: "100px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    lineHeight: "0.5",
                    textAlign: "center",
                };

                if (isInline) {
                    labelStyle = {
                        ...labelStyle,
                        height: style?.input?.height || "100px",
                        flexDirection: undefined,
                        lineHeight: undefined,
                    };
                }

                return (
                    <div className="form-group">
                        <label>
                            {label} {required && <span style={{ color: "red" }}>&nbsp;*</span>} {viewFile}{" "}
                        </label>
                        <label htmlFor={id || "file-upload"} style={labelStyle} className="upload_file">
                            {!disabled && <CloudUploadRoundedIcon style={{ marginBottom: "5px" }} />}
                            {!disabled &&
                                (previewUrl ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <a href={previewUrl} target="_blank" rel="noopener noreferrer" className={isInline && "mx-2"}>
                                            View
                                        </a>
                                    </div>
                                ) : (
                                    <div>
                                        <p className={isInline && "mb-1 mx-2"}>Browse</p>
                                        {!isInline && (
                                            <p className="text-primary" style={{ fontSize: "12px", marginTop: "4px" }}>
                                                {" "}
                                                (Max File Size: 1MB)
                                            </p>
                                        )}
                                    </div>
                                ))}
                        </label>
                        {FileViewEdit}
                        <input
                            id={id || "file-upload"}
                            style={{ display: "none" }}
                            type="file"
                            readOnly={readonly}
                            disabled={disabled}
                            name={name}
                            multiple={multiple}
                            onChange={handleFileChange}
                            required={required || false}
                            accept={accept || ".pdf,.png,.jpg,.jpeg"}
                        />
                    </div>
                );
            case "custom-file":
                return (
                    <div className="form-group">
                        <label>
                            {label} {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                        </label>
                        <UploadFile updateName={updateName} deleteName={deleteName} onSave={handleCustomFileChange} name={name} height={"300px"} defaultFiles={formValues[name]} />
                        {formValues[name] && (
                            <FileView
                                onDelete={(updatedDefaultVales, deletedValues) => setFormValues({ ...formValues, [name]: updatedDefaultVales, [deleteName]: deletedValues })}
                                filesData={formValues[name]}
                                label={"Uploaded " + label}
                            />
                        )}
                    </div>
                );
            case "rowHeader":
                return (
                    <>
                        <p className="header" style={{ fontSize: "17px" }}>
                            {label}
                        </p>
                        <hr className="divider mb-3" />
                    </>
                );
            case "button":
                return (
                    <>
                        <button className={classNames} type="button" onClick={onClick} style={{ display: `${show ? "block" : "none"}` }}>
                            {label}
                        </button>
                    </>
                );
            default:
                return (
                    <div className="form-group" style={style?.formGroup}>
                        <label htmlFor={id}>
                            {label} {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                        </label>
                        <input
                            type={type}
                            id={id}
                            readOnly={readonly}
                            name={name}
                            disabled={disabled}
                            value={maskedValues[name] || ""}
                            onChange={handleInputChange}
                            className={["form-control", ...classNames].join(" ")}
                            required={required || false}
                            placeholder={placeholder}
                            style={style?.input}
                        />
                    </div>
                );
        }
    }
};

export default DynamicForm;
