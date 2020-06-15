import React, { useCallback, useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone'

import './styles.css';


const Dropzone = ({ onFileUploaded }) => {
    const [selecetedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])

    const {getRootProps, getInputProps} = useDropzone({
      onDrop,
      accept: 'image/*'
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            { selecetedFileUrl
                ? <img src={selecetedFileUrl} alt="Point Thumbnail" />
                : (
                    <p>
                        <FiUpload />
                        Imagem do estabelecimento
                    </p>
                )
            }
        </div>
    )
}

export default Dropzone;