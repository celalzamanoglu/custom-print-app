import { FaClipboardList, FaPaintBrush, FaUpload } from "react-icons/fa";

export const STEPS = [
    {
      id: 1,
      title: 'UPLOAD YOUR LOGO',
      description: 'Upload vector image file – .pdf, .png, .jpg, or .eps vector graphic.',
      icon: FaUpload,
    },
    {
      id: 2,
      title: 'DESIGN YOUR PAPER',
      description: 'Adjust your logo or image in the design tool on the paper and design it.',
      icon: FaPaintBrush,
    },
    {
      id: 3,
      title: 'SELECT PAPER CHOICES',
      description: 'Select paper size, print color(s), white or Kraft paper, and sheet quantity.',
      icon: FaClipboardList,
    },
  ];