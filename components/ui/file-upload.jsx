import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { toast } from "sonner";
import MagicButton from "../globals/Button/MagicButton";
import { Button } from "./button";
import { Trash2 } from "lucide-react";

const mainVariant = {
    initial: {
        x: 0,
        y: 0,
    },
    animate: {
        x: 20,
        y: -20,
        opacity: 0.9,
    },
};

const secondaryVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const FileUpload = ({
    onChange,
    onUpload,
}) => {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
        onChange && onChange(newFiles);
    };

    const handleDeleteFile = () => {
        setFiles([]);
        onChange && onChange([]);
    }

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const { getRootProps, isDragActive } = useDropzone({
        multiple: false,
        noClick: true,
        onDrop: handleFileChange,
        onDropRejected: (error) => {
            toast.error(error)
        },
    });

    return (
        (<div className="w-full" {...getRootProps()}>
            <motion.div
                whileHover="animate"
                className="relative block w-full p-5 overflow-hidden rounded-lg cursor-pointer md:p-8 lg:p-10 group/file">
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                    className="hidden" />
                <div
                    className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                    <GridPattern />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p
                        className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
                        Upload Image
                    </p>
                    <p
                        className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400">
                        Drag or drop your files here or click to upload
                    </p>
                    <div className="relative w-full mt-5 md:mt-10">
                        {files.length > 0 &&
                            files.map((file, idx) => (
                                <motion.div
                                    key={"file" + idx}
                                    layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                                >
                                    <div
                                        className={cn(
                                            "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start p-1 md:p-4 w-full mx-auto rounded-md",
                                            "shadow-sm"
                                        )}>
                                        <Image
                                            className="w-full max-h-[20rem]"
                                            src={URL.createObjectURL(file)}
                                            width={600}
                                            height={500}
                                            alt="Selected Image"
                                        />
                                        <Button onClick={handleDeleteFile} className="px-2.5 py-1 absolute top-2 right-2" variant="outline">
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <form action={onUpload}>
                                        <MagicButton loadingText="Uploading..." type="submit" containerClass="w-full mt-2" className="w-full">
                                            Upload
                                        </MagicButton>
                                    </form>
                                </motion.div>
                            ))}
                        {!files?.length && (
                            <motion.div
                                onClick={handleClick}
                                layoutId="file-upload"
                                variants={mainVariant}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={cn(
                                    "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[10rem] md:max-w-[8rem] mx-auto rounded-md",
                                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)] mb-16"
                                )}>
                                {isDragActive ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center text-neutral-600">
                                        Drop it
                                        <IconUpload className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                    </motion.p>
                                ) : (
                                    <IconUpload className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                                )}
                            </motion.div>
                        )}

                        {!files?.length && (
                            <motion.div
                                variants={secondaryVariant}
                                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"></motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>)
    );
};

export function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        (<div
            className="flex flex-wrap items-center justify-center flex-shrink-0 scale-105 bg-gray-100 dark:bg-neutral-900 gap-x-px gap-y-px">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: columns }).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        (<div
                            key={`${col}-${row}`}
                            className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${index % 2 === 0
                                ? "bg-gray-50 dark:bg-neutral-950"
                                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                                }`} />)
                    );
                }))}
        </div>)
    );
}