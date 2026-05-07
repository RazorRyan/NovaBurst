import { memo, useMemo } from "react";
import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  Line,
  LinearGradient,
  Paint,
  Path,
  RadialGradient,
  Rect,
  Skia,
  vec,
} from "@shopify/react-native-skia";

import { RenderSnapshot } from "../types/game";
import { cosmicPalette, energyColors } from "../utils/palette";

type GameCanvasProps = {
  snapshot: RenderSnapshot;
};

function GameCanvasComponent({ snapshot }: GameCanvasProps) {
  const shieldPaths = useMemo(() => {
    return snapshot.shieldSegments.map((segment) => {
      const path = Skia.Path.Make();
      const radius = snapshot.shieldRadius;
      path.addArc(
        {
          x: snapshot.center.x - radius,
          y: snapshot.center.y - radius,
          width: radius * 2,
          height: radius * 2,
        },
        (segment.startAngle * 180) / Math.PI,
        (segment.sweepAngle * 180) / Math.PI,
      );
      return {
        colorIndex: segment.colorIndex,
        path,
      };
    });
  }, [snapshot.center.x, snapshot.center.y, snapshot.shieldRadius, snapshot.shieldSegments]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Rect x={0} y={0} width={snapshot.width} height={snapshot.height}>
        <Paint>
          <RadialGradient
            c={vec(snapshot.center.x, snapshot.center.y)}
            r={Math.max(snapshot.width, snapshot.height) * 0.72}
            colors={[cosmicPalette.nebulaB, cosmicPalette.nebulaC, cosmicPalette.background]}
          />
        </Paint>
      </Rect>
      <Rect x={0} y={0} width={snapshot.width} height={snapshot.height} color="rgba(116,58,255,0.04)">
        <BlurMask blur={90} style="solid" />
      </Rect>

      {snapshot.stars.map((star) => (
        <Circle
          key={star.id}
          cx={star.x}
          cy={star.y}
          r={star.radius}
          color={`rgba(255,255,255,${star.alpha})`}
        />
      ))}

      {[0.4, 0.63, 0.88].map((ratio, index) => (
        <Circle
          key={ratio}
          cx={snapshot.center.x}
          cy={snapshot.center.y}
          r={snapshot.shieldRadius * (1.2 + ratio) + (snapshot.elapsedMs * 0.005 * (index + 1)) % 22}
          color="rgba(126,168,255,0.06)"
          style="stroke"
          strokeWidth={index === 0 ? 1 : 0.8}
        />
      ))}

      <Circle cx={snapshot.center.x} cy={snapshot.center.y} r={snapshot.coreRadius * 2.8} color="rgba(89,246,255,0.08)">
        <BlurMask blur={28} style="solid" />
      </Circle>
      <Circle cx={snapshot.center.x} cy={snapshot.center.y} r={snapshot.coreRadius * 1.65} color="rgba(255,255,255,0.18)">
        <BlurMask blur={20} style="solid" />
      </Circle>
      <Circle cx={snapshot.center.x} cy={snapshot.center.y} r={snapshot.coreRadius} color={cosmicPalette.core} />
      <Circle cx={snapshot.center.x - 8} cy={snapshot.center.y - 10} r={snapshot.coreRadius * 0.28} color="rgba(255,255,255,0.85)" />

      {shieldPaths.map((segment) => (
        <Group key={segment.colorIndex}>
          <Path
            path={segment.path}
            color={energyColors[segment.colorIndex]}
            style="stroke"
            strokeWidth={snapshot.shieldThickness * 1.85}
            strokeCap="round"
          >
            <BlurMask blur={12} style="solid" />
          </Path>
          <Path
            path={segment.path}
            color={energyColors[segment.colorIndex]}
            style="stroke"
            strokeWidth={snapshot.shieldThickness}
            strokeCap="round"
          />
        </Group>
      ))}

      <Circle cx={snapshot.center.x} cy={snapshot.center.y} r={snapshot.shieldRadius} color="rgba(255,255,255,0.05)" style="stroke" strokeWidth={1.5} />

      {snapshot.incomingObjects.map((object) => (
        <Group key={object.id}>
          <Line
            p1={vec(object.previousX, object.previousY)}
            p2={vec(object.x, object.y)}
            color={`${energyColors[object.colorIndex]}66`}
            strokeWidth={Math.max(2, object.radius * 0.4)}
          >
            <BlurMask blur={7} style="solid" />
          </Line>
          <Circle cx={object.x} cy={object.y} r={object.radius * 2.2} color={`${energyColors[object.colorIndex]}20`}>
            <BlurMask blur={15} style="solid" />
          </Circle>
          <Circle cx={object.x} cy={object.y} r={object.radius} color={energyColors[object.colorIndex]} />
          <Circle cx={object.x - object.radius * 0.28} cy={object.y - object.radius * 0.28} r={object.radius * 0.25} color="rgba(255,255,255,0.8)" />
        </Group>
      ))}

      {snapshot.particles.map((particle) => {
        const alpha = particle.life / particle.maxLife;
        return (
          <Circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.radius * alpha}
            color={`${energyColors[particle.colorIndex]}${Math.round(alpha * 255)
              .toString(16)
              .padStart(2, "0")}`}
          >
            <BlurMask blur={6} style="solid" />
          </Circle>
        );
      })}

      {snapshot.shockwaves.map((wave) => {
        const alpha = wave.life / wave.maxLife;
        return (
          <Circle
            key={wave.id}
            cx={wave.x}
            cy={wave.y}
            r={wave.radius}
            color={`${energyColors[wave.colorIndex]}${Math.round(alpha * 120)
              .toString(16)
              .padStart(2, "0")}`}
            style="stroke"
            strokeWidth={3}
          >
            <BlurMask blur={8} style="solid" />
          </Circle>
        );
      })}

      <Line
        p1={vec(snapshot.center.x - 10, snapshot.center.y)}
        p2={vec(snapshot.center.x + 10, snapshot.center.y)}
        color="rgba(255,255,255,0.22)"
        strokeWidth={1}
      />
      <Line
        p1={vec(snapshot.center.x, snapshot.center.y - 10)}
        p2={vec(snapshot.center.x, snapshot.center.y + 10)}
        color="rgba(255,255,255,0.22)"
        strokeWidth={1}
      />
      {snapshot.comboPulse > 0 ? (
        <Rect x={0} y={0} width={snapshot.width} height={snapshot.height}>
          <Paint>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(snapshot.width, snapshot.height)}
              colors={[
                `rgba(89,246,255,${snapshot.comboPulse * 0.08})`,
                "rgba(255,255,255,0)",
                `rgba(255,126,251,${snapshot.comboPulse * 0.05})`,
              ]}
            />
          </Paint>
        </Rect>
      ) : null}
      {snapshot.damageFlash > 0 ? (
        <Rect
          x={0}
          y={0}
          width={snapshot.width}
          height={snapshot.height}
          color={`rgba(255,95,116,${snapshot.damageFlash * 0.16})`}
        />
      ) : null}
    </Canvas>
  );
}

export const GameCanvas = memo(GameCanvasComponent);
