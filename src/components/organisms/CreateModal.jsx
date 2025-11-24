import React, { useState, useEffect } from 'react';
import DynamicInputs from '../molecules/DynamicInput';
import Button from '../atoms/ButtonAtom';
import InputFile from '../atoms/InputFile';
import { uploadToImgBB } from '../../utils/uploadImage';
import '../../style/components/organisms/CreateModal.css';

function CreateModal({
  isOpen,
  onClose,
  onSubmit,
  inputsConfig = [],
  title = "Crear nuevo",
  submitText = "Guardar",
  loading = false,
  initialData = {},
}) {
  const [formData, setFormData] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});
  const [uploadingImages, setUploadingImages] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      const initialFormData = {};
      const initialPreviews = {};
      
      inputsConfig.forEach((input) => {
        if (input.type === 'file') {
          initialFormData[input.name] = initialData[input.name] || '';
          initialPreviews[input.name] = initialData[input.name] || null;
        } else {
          initialFormData[input.name] = initialData[input.name] || input.value || '';
        }
      });

      setFormData(initialFormData);
      setImagePreviews(initialPreviews);
      setErrors({});
    }
  }, [isOpen, inputsConfig, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, [fieldName]: 'Por favor, selecciona un archivo de imagen válido' }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [fieldName]: 'La imagen no debe superar los 10MB' }));
      return;
    }

    setUploadingImages(prev => ({ ...prev, [fieldName]: true }));
    setUploadProgress(prev => ({ ...prev, [fieldName]: 0 }));
    setErrors(prev => ({ ...prev, [fieldName]: '' }));

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fieldName] || 0;
          if (currentProgress < 90) {
            return { ...prev, [fieldName]: currentProgress + 10 };
          }
          return prev;
        });
      }, 200);

      const { url, preview } = await uploadToImgBB(file);
      
      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [fieldName]: 100 }));

      setFormData((prev) => ({ ...prev, [fieldName]: url }));
      setImagePreviews((prev) => ({ ...prev, [fieldName]: preview }));

      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fieldName];
          return newProgress;
        });
      }, 1000);

    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors(prev => ({ ...prev, [fieldName]: `Error al subir la imagen: ${error.message}` }));
    } finally {
      setUploadingImages(prev => {
        const newUploading = { ...prev };
        delete newUploading[fieldName];
        return newUploading;
      });
    }
  };

  const removeImage = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: '' }));
    setImagePreviews((prev) => ({ ...prev, [fieldName]: null }));
    setErrors(prev => ({ ...prev, [fieldName]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    inputsConfig.forEach(input => {
      if (input.required) {
        if (input.type === 'file') {
          if (!formData[input.name]) {
            newErrors[input.name] = `${input.label || input.name} es requerido`;
          }
        } else {
          if (!formData[input.name]?.toString().trim()) {
            newErrors[input.name] = `${input.label || input.name} es requerido`;
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const stillUploading = Object.keys(uploadingImages).length > 0;
    if (stillUploading) {
      alert('Espera a que terminen de subirse las imágenes');
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button
            onClick={onClose}
            className="modal-close"
            disabled={loading || Object.keys(uploadingImages).length > 0}
          >
            <svg className="icon-close" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {inputsConfig.map((input) => {
            if (input.type === 'file') {
              return (
                <div key={input.name} className="form-group">
                  <label className="form-label">
                    {input.label || input.name} {input.required && <span className="required-asterisk">*</span>}
                  </label>
                  <InputFile
                    onChange={(e) => handleImageChange(e, input.name)}
                    disabled={uploadingImages[input.name] || loading}
                    preview={imagePreviews[input.name]}
                    onRemove={() => removeImage(input.name)}
                    uploadProgress={uploadProgress[input.name]}
                    uploading={uploadingImages[input.name]}
                  />
                  
                  {uploadingImages[input.name] && (
                    <div className="upload-status">
                      <div className="progress-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${uploadProgress[input.name]}%` }}
                        ></div>
                      </div>
                      <p className="uploading-text">
                        <span className="spinner"></span>
                        Subiendo {input.label || input.name}... {uploadProgress[input.name]}%
                      </p>
                    </div>
                  )}
                  
                  {imagePreviews[input.name] && !uploadingImages[input.name] && (
                    <div className="success-status">
                      <p className="success-text">
                        <span className="success-icon">✓</span>
                        {input.label || input.name} lista
                      </p>
                    </div>
                  )}

                  {errors[input.name] && (
                    <p className="error-message">{errors[input.name]}</p>
                  )}

                  <div className="image-help">
                    <p className="help-text">
                      Formatos: JPEG, PNG, WEBP • Máx: 10MB • Se optimizará automáticamente
                    </p>
                  </div>
                </div>
              );
            }

            if (input.type === 'select') {
              return (
                <div key={input.name} className="form-group">
                  <label className="form-label">
                    {input.label || input.name} {input.required && <span className="required-asterisk">*</span>}
                  </label>
                  <select
                    name={input.name}
                    value={formData[input.name] || ''}
                    onChange={handleChange}
                    className={`form-select ${errors[input.name] ? 'error' : ''}`}
                    required={input.required}
                    disabled={loading}
                  >
                    <option value="">{input.placeholder || `Seleccionar ${input.label || input.name}`}</option>
                    {input.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors[input.name] && (
                    <p className="error-message">{errors[input.name]}</p>
                  )}
                </div>
              );
            }

            return (
              <div key={input.name} className="form-group">
                <label className="form-label">
                  {input.label || input.name} {input.required && <span className="required-asterisk">*</span>}
                </label>
                <DynamicInputs
                  Inputs={[{
                    ...input,
                    value: formData[input.name] || '',
                    onChange: handleChange,
                    disabled: loading,
                  }]}
                />
                {errors[input.name] && (
                  <p className="error-message">{errors[input.name]}</p>
                )}
              </div>
            );
          })}

          <div className="modal-actions">
            <Button
              text={loading ? "Guardando..." : submitText}
              className={`btn-primary ${loading || Object.keys(uploadingImages).length > 0 ? 'btn-disabled' : ''}`}
              disabled={loading || Object.keys(uploadingImages).length > 0}
            />
            <Button
              text="Cancelar"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading || Object.keys(uploadingImages).length > 0}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateModal;