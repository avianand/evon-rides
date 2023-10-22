declare module "react-native-draggable-view" {
  interface DraggableViewProps {
    // Define the props for the DraggableView component
    x: number;
    y: number;
    onDragStart: () => void;
    onDragEnd: () => void;
  }

  class DraggableView extends React.Component<DraggableViewProps> {}
}
