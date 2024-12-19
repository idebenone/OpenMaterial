import FileDirectory from "./file-directory";

const FileDirectoryPanel = () => {
  return (
    <div className="py-2 h-full overflow-y-scroll custom-scrollbar">
      <FileDirectory />
    </div>
  );
};

export default FileDirectoryPanel;
