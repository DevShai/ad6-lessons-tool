import React, {  } from 'react';
import 'src/assets/styles/MainPage.css'
import { FileData, getMediaPreview } from 'src/types/datatypes';
import { Form, Stack } from 'react-bootstrap';

interface FieldProps {
    file?: FileData,
    filename?: string,
    acceptedFormats?: string
    isFileValid?: (file: FileData) => boolean,
    onFileChanged?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const getAudioPreview = (data: FileData, id: string, contentType: string = "", sliceSize: number = 512) => {
    if (data.base64.length > 0) {
        return <audio controls src={getMediaPreview(data.base64, id, contentType, sliceSize)} />
    }
    else {
        return ''
    }
}

const FileInput: React.FC<FieldProps> = ({
    file = { base64: '', fileObject: null },
    filename = "",
    acceptedFormats = "",
    isFileValid = (f) => {return f.fileObject != null},
    onFileChanged,

}) => {
    return (
        <Stack direction='horizontal'>
            <Form.Control
                type="file" 
                size='sm' 
                accept={acceptedFormats}
                isValid={isFileValid(file)}
                onChange={onFileChanged}/>
            {getAudioPreview(file, filename)}
        </Stack>
    );
}
export default FileInput;