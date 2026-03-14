import { Card, CardBody, CardHeader, CardTitle, Row, Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { filesToBase64 } from '@/utils/imageStorage';
import { useCallback, useState } from 'react';

const ACCEPTED_IMAGE_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  'image/bmp': ['.bmp'],
};

/**
 * Property photo upload: converts images to base64 so they work without an image API.
 * Supports PNG, JPG, GIF, WEBP, BMP. Works locally and in production (store in API or localStorage).
 */
const PropertyPhotoUpload = ({ title = 'Add Property Photo', photos = [], onPhotosChange, maxFiles = 10 }) => {
  const [converting, setConverting] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length || !onPhotosChange) return;
      setConverting(true);
      try {
        const newBase64 = await filesToBase64(acceptedFiles);
        const combined = [...(Array.isArray(photos) ? photos : []), ...newBase64].slice(0, maxFiles);
        onPhotosChange(combined);
      } catch (e) {
        console.warn('PropertyPhotoUpload: convert failed', e);
      } finally {
        setConverting(false);
      }
    },
    [photos, onPhotosChange, maxFiles]
  );

  const removeAt = (index) => {
    if (!onPhotosChange) return;
    const next = [...(Array.isArray(photos) ? photos : [])];
    next.splice(index, 1);
    onPhotosChange(next);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h4">{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <Dropzone
          onDrop={onDrop}
          accept={ACCEPTED_IMAGE_TYPES}
          maxFiles={maxFiles - (Array.isArray(photos) ? photos.length : 0)}
          disabled={converting}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone dropzone-custom py-5">
              <div className="dz-message" {...getRootProps()}>
                <input {...getInputProps()} />
                <IconifyIcon
                  icon="bx:cloud-upload"
                  height={48}
                  width={48}
                  className="mb-4 text-primary"
                />
                <h3>
                  {converting
                    ? 'Converting...'
                    : 'Drop your images here, or click to browse'}
                </h3>
                <span className="text-muted fs-13">
                  PNG, JPG, JPEG, GIF, WEBP, BMP. 1600×1200 (4:3) recommended.
                </span>
              </div>
            </div>
          )}
        </Dropzone>

        {Array.isArray(photos) && photos.length > 0 && (
          <div className="dz-preview mt-3">
            <Row className="g-2">
              {photos.map((dataUrl, idx) => (
                <Col xs={6} sm={4} md={3} key={idx}>
                  <div className="position-relative border rounded overflow-hidden bg-light">
                    <img
                      src={dataUrl}
                      alt={`Preview ${idx + 1}`}
                      className="img-fluid w-100"
                      style={{ objectFit: 'cover', aspectRatio: '4/3' }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                      onClick={() => removeAt(idx)}
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default PropertyPhotoUpload;
