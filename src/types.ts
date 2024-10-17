export interface Component {
  id: number;
  type: string;
  content: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export interface WebProperties {
  backgroundColor: string;
  textColor: string;
  backgroundShape: 'none' | 'circle' | 'square' | 'triangle';
  shapeColor: string;
}