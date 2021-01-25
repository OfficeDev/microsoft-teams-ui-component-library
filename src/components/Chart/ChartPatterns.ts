import { ILineChartPatterns, PointStyles } from "./ChartTypes";

const BACKGROUND_COLOR = "transparent";
const PATTERN_COLOR = "rgba(0, 0, 0, 0.8)";
const POINT_STYLE = "round";
const SIZE = 20;

export const lineChartPatterns: ILineChartPatterns[] = [
  { lineBorderDash: [], pointStyle: PointStyles.Circle },
  { lineBorderDash: [], pointStyle: PointStyles.Rectangle },
  { lineBorderDash: [], pointStyle: PointStyles.Triangle },
  { lineBorderDash: [5, 5], pointStyle: PointStyles.Circle },
  { lineBorderDash: [5, 5], pointStyle: PointStyles.RectangleRotated },
  { lineBorderDash: [5, 5], pointStyle: PointStyles.Triangle },
];

export const chartDataPointPatterns = (colorScheme: any) => {
  return [
    {
      shapeType: Shapes.Square,
      backgroundColor: colorScheme.default.background,
      patternColor: colorScheme.brand.background,
      size: 10,
    },
    {
      shapeType: Shapes.DiagonalRightLeft,
      backgroundColor: colorScheme.default.background,
      patternColor: colorScheme.brand.background,
      size: 5,
    },
    {
      shapeType: Shapes.Grid,
      backgroundColor: colorScheme.default.background,
      patternColor: colorScheme.brand.background,
      size: 10,
    },
    {
      shapeType: Shapes.VerticalLine,
      backgroundColor: colorScheme.default.background,
      patternColor: colorScheme.brand.background,
      size: 10,
    },
    {
      shapeType: Shapes.GridRightLeft,
      backgroundColor: colorScheme.default.background,
      patternColor: colorScheme.brand.background,
      size: 3,
    },
    {
      shapeType: Shapes.Diagonal,
      backgroundColor: colorScheme.default.background,
      patternColor: colorScheme.brand.background,
      size: 5,
    },
  ];
};

export class Entity {
  constructor(fields?: any) {
    Object.assign(this, fields);
  }
}

export class Shape extends Entity {
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D | null;
  size = SIZE;
  backgroundColor: string = BACKGROUND_COLOR;
  patternColor: string = PATTERN_COLOR;

  constructor(fields: Partial<Shape>) {
    super(fields);

    if (fields.size) {
      this.size = fields.size;
    }
    if (fields.backgroundColor) {
      this.backgroundColor = fields.backgroundColor;
    }
    if (fields.patternColor) {
      this.patternColor = fields.patternColor;
    }

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = this.size;
    this.canvas.height = this.size;

    if (this.context) {
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  setStrokeProps() {
    if (this.context) {
      this.context.strokeStyle = this.patternColor;
      this.context.lineWidth = this.size / 10;
      this.context.lineJoin = POINT_STYLE;
      this.context.lineCap = POINT_STYLE;
    }
  }

  setFillProps() {
    if (this.context) {
      this.context.fillStyle = this.patternColor;
    }
  }
}

class Square extends Shape {
  drawTile() {
    const halfSize = this.size / 2;
    if (this.context) {
      this.context.beginPath();
      this.setFillProps();
      this.drawSquare();
      this.drawSquare(halfSize, halfSize);
      this.context.fill();
    }
    return this.canvas;
  }

  drawSquare(offsetX = 0, offsetY = 0) {
    const halfSize = this.size / 2;
    const gap = this.size / 5;
    this.context!.fillRect(
      offsetX + gap,
      offsetY + gap,
      halfSize - gap * 2,
      halfSize - gap * 2
    );
    this.context!.closePath();
  }
}

class Diagonal extends Shape {
  drawTile() {
    const halfSize = this.size / 2;

    if (this.context) {
      this.context.beginPath();

      this.setStrokeProps();

      this.drawDiagonalLine();
      this.drawDiagonalLine(halfSize, halfSize);

      this.context.stroke();
      return this.canvas;
    }
  }

  drawDiagonalLine(offsetX = 0, offsetY = 0) {
    const size = this.size;
    const halfSize = size / 2;
    const gap = 1;

    if (this.context) {
      this.context.moveTo(halfSize - gap - offsetX, gap * -1 + offsetY);
      this.context.lineTo(size + 1 - offsetX, halfSize + 1 + offsetY);

      this.context.closePath();
    }
  }
}

class DiagonalRightLeft extends Diagonal {
  drawTile() {
    if (this.context) {
      this.context.translate(this.size, 0);
      this.context.rotate((90 * Math.PI) / 180);

      Diagonal.prototype.drawTile.call(this);

      return this.canvas;
    }
  }
}

class Grid extends Shape {
  drawTile() {
    const halfSize = this.size / 2;

    if (this.context) {
      this.context.beginPath();

      this.setStrokeProps();

      // this.drawDiagonalLine();
      // this.drawDiagonalLine(halfSize, halfSize);

      this.drawOpositeDiagonalLine();
      this.drawOpositeDiagonalLine(halfSize, halfSize);

      this.context.stroke();
    }

    return this.canvas;
  }

  drawDiagonalLine(offsetX = 0, offsetY = 0) {
    const size = this.size;
    const halfSize = size / 2;
    const gap = 1;

    if (this.context) {
      this.context.moveTo(halfSize - gap - offsetX, gap * -1 + offsetY);
      this.context.lineTo(size + 1 - offsetX, halfSize + 1 + offsetY);

      this.context.closePath();
    }
  }

  drawOpositeDiagonalLine(offsetX = 0, offsetY = 0) {
    const size = this.size;
    const halfSize = size / 2;
    const gap = 1;

    if (this.context) {
      this.context.moveTo(halfSize - gap + offsetX, gap * -1 - offsetY);
      this.context.lineTo(size + 1 + offsetX, halfSize + 1 - offsetY);

      this.context.closePath();
    }
  }
}

class Line extends Shape {
  drawTile() {
    if (this.context) {
      const halfSize = this.size / 2;

      this.context.beginPath();

      this.setStrokeProps();

      this.drawLine();
      this.drawLine(halfSize, halfSize);

      this.context.stroke();

      return this.canvas;
    }
  }

  drawLine(offsetX = 0, offsetY = 0) {
    if (this.context) {
      const size = this.size;
      const quarterSize = size / 4;

      this.context.moveTo(0, quarterSize + offsetY);
      this.context.lineTo(this.size, quarterSize + offsetY);

      this.context.closePath();
    }
  }
}

class VerticalLine extends Line {
  drawTile() {
    if (this.context) {
      this.context.translate(this.size, 0);
      this.context.rotate((90 * Math.PI) / 180);

      Line.prototype.drawTile.call(this);

      return this.canvas;
    }
  }
}

class GridRightLeft extends Grid {
  drawTile() {
    if (this.context) {
      this.context.translate(this.size, 0);
      this.context.rotate((90 * Math.PI) / 180);

      Grid.prototype.drawTile.call(this);

      return this.canvas;
    }
  }
}

export enum Shapes {
  Square = "square",
  DiagonalRightLeft = "diagonalRightLeft",
  Grid = "grid",
  Diagonal = "diagonal",
  VerticalLine = "verticalLine",
  GridRightLeft = "gridRightLeft",
}
const shapes = {
  [Shapes.Square]: Square,
  [Shapes.DiagonalRightLeft]: DiagonalRightLeft,
  [Shapes.Grid]: Grid,
  [Shapes.Diagonal]: Diagonal,
  [Shapes.VerticalLine]: VerticalLine,
  [Shapes.GridRightLeft]: GridRightLeft,
};
interface IDraw {
  shapeType: Shapes;
  backgroundColor: string;
  patternColor: string;
  size: number;
}

export function buildPattern({
  shapeType,
  backgroundColor,
  patternColor,
  size,
}: IDraw) {
  const patternCanvas = document.createElement("canvas");
  const patternContext = patternCanvas.getContext("2d");
  const outerSize = size * 2;

  const Shape = shapes[shapeType];
  const shape = new Shape({ size, backgroundColor, patternColor });

  const pattern: any = patternContext!.createPattern(
    shape.drawTile()!,
    "repeat"
  );

  patternCanvas.width = outerSize;
  patternCanvas.height = outerSize;

  pattern.shapeType = shapeType;

  return pattern;
}
