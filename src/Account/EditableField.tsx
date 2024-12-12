import React, { useState, useEffect, useRef } from 'react';

interface EditableFieldProps {
  value: string;
  onSave: (fieldName: string, value: string) => void;
  fieldName: string;
  className?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  onSave, 
  fieldName,
  className = "text-yellow-500/80"
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onSave(fieldName, editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-transparent border-b border-green-500 outline-none ${className}`}
      />
    );
  }

  return (
    <span 
      onDoubleClick={handleDoubleClick} 
      className={`cursor-pointer hover:text-green-500 transition-colors ${className}`}
      title="Double click to edit"
    >
      {value}
    </span>
  );
};
