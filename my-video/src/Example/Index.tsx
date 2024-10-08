import { Video, Sequence, AbsoluteFill } from "remotion";
import videoSource from "../assets/intro.mp4";
import { Text } from "./Text";
import { z } from "zod";

export const myCompSchema = z.object({
  text: z.string(),
});

export const MyVideo: React.FC<z.infer<typeof myCompSchema>> = ({
  text = "Hello remotion !",
}) => {
  const styleCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div>
      {/* La séquence jouera ta vidéo pendant les 100 premières frames */}
      <Sequence from={0} durationInFrames={100}>
        <Video src={videoSource} />
      </Sequence>

      <Sequence from={100} style={{ background: "black" }}>
        <AbsoluteFill style={styleCenter}>
          <Text>{text}</Text>
        </AbsoluteFill>
      </Sequence>
    </div>
  );
};
