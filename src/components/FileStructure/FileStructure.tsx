import React, { useCallback, useState } from "react";
import { FileNode } from "./data";

const FileStructure: React.FC<FileNode> = ({ id, children }: FileNode) => {
  const [showChildren, setShowChildren] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setShowChildren(!showChildren);
  }, [showChildren, setShowChildren]);

  return (
    <div>
      <div onClick={handleClick}>
        <h4 style={{ fontWeight: showChildren ? "bold" : "normal" }}>{id}</h4>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          left: 20,
          borderLeft: "1px solid black",
          paddingLeft: 5,
        }}
      >
        {showChildren &&
          (children ?? []).map((node: FileNode) => <FileStructure {...node} />)}
      </div>
    </div>
  );
};

export default FileStructure;
