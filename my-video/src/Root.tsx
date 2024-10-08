import "./tailwind.css";
import { Composition } from "remotion";
import { MyVideo, myCompSchema as MyVideoSchema } from "./Example/Index";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      /> */}
      <Composition
        id="Intro"
        schema={MyVideoSchema}
        component={MyVideo}
        durationInFrames={200}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          text: "Welcome to Remotion",
        }}
      />
    </>
  );
};
