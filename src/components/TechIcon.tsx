import React from 'react';
import { 
  Code, 
  Palette, 
  Terminal, 
  GitBranch, 
  Package, 
  FileCode, 
  Layers, 
  Server, 
  Globe, 
  Database, 
  Cpu, 
  HardDrive,
  type LucideProps 
} from 'lucide-react';

interface TechIconProps extends LucideProps {
  iconKey?: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ iconKey, className = "w-5 h-5", ...props }) => {
  switch (iconKey?.toLowerCase()) {
    case 'code':
    case 'html5':
      return <Code className={className} {...props} />;
    case 'palette':
    case 'css3':
      return <Palette className={className} {...props} />;
    case 'terminal':
    case 'javascript':
      return <Terminal className={className} {...props} />;
    case 'gitbranch':
    case 'git':
      return <GitBranch className={className} {...props} />;
    case 'package':
    case 'npm':
      return <Package className={className} {...props} />;
    case 'filecode':
    case 'typescript':
      return <FileCode className={className} {...props} />;
    case 'layers':
    case 'react':
      return <Layers className={className} {...props} />;
    case 'server':
    case 'node.js':
      return <Server className={className} {...props} />;
    case 'globe':
    case 'express.js':
      return <Globe className={className} {...props} />;
    case 'database':
    case 'sql':
      return <Database className={className} {...props} />;
    case 'cpu':
    case 'postgresql':
      return <Cpu className={className} {...props} />;
    case 'harddrive':
    case 'mysql':
      return <HardDrive className={className} {...props} />;
    default:
      return <Code className={className} {...props} />;
  }
};
