export interface Component {
  id: string;
  name: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
}

export interface DropZone {
  id: string;
  parentId: string | null;
  children: Component[];
}

export interface BuilderState {
  components: Component[];
  selectedComponent: Component | null;
  dropZones: DropZone[];
} 