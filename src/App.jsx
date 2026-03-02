import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
  Float,
  Center,
} from "@react-three/drei";

function DynamicModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return (
    <Float rotationIntensity={0.4} floatIntensity={0.6}>
      <Center position={[0, 0, 0]}>
        <primitive object={scene} scale={1.8} rotation={[0, -Math.PI / 5, 0]} />
      </Center>
    </Float>
  );
}

const Overlay = ({ setPage, activePage }) => {
  const menuItemStyle = (pageName) => ({
    cursor: "pointer",
    color: activePage === pageName ? "#00f2ff" : "white",
    fontWeight: activePage === pageName ? "bold" : "500",
    textShadow:
      activePage === pageName ? "0 0 10px rgba(0,242,255,0.6)" : "none",
    transition: "color 0.3s ease",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "40px 60px",
        color: "white",
        zIndex: 10,
        boxSizing: "border-box",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pointerEvents: "auto",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
            onError={(e) => (e.target.style.display = "none")}
          />

          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "900",
              letterSpacing: "3px",
              margin: 0,
            }}
          >
            SMART-CITY
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            gap: "30px",
            fontSize: "0.9rem",
            fontWeight: "500",
            opacity: 0.7,
            flexWrap: "wrap",
          }}
        >
          <span style={menuItemStyle("home")} onClick={() => setPage("home")}>
            Home
          </span>
          <span style={menuItemStyle("bin")} onClick={() => setPage("bin")}>
            Smart Bin
          </span>
          <span style={menuItemStyle("toll")} onClick={() => setPage("toll")}>
            Smart Toll Gate
          </span>
          <span
            style={menuItemStyle("traffic")}
            onClick={() => setPage("traffic")}
          >
            Smart Traffic
          </span>
          <span style={menuItemStyle("light")} onClick={() => setPage("light")}>
            Smart Light
          </span>
          <span
            style={menuItemStyle("parking")}
            onClick={() => setPage("parking")}
          >
            Parking
          </span>
        </div>
      </nav>

      <div style={{ maxWidth: "500px", pointerEvents: "auto" }}>
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 5rem)",
            margin: 0,
            lineHeight: 0.85,
            fontWeight: "900",
            textTransform: "uppercase",
          }}
        >
          SMART
          <br />
          <span
            style={{
              color: "#00f2ff",
              textShadow: "0 0 30px rgba(0,242,255,0.4)",
            }}
          >
            EVOLUTION
          </span>
        </h1>
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState("home");

  const pageConfig = {
    home: { model: "/smart_city1.glb" },
    bin: { model: "/smart_bin.glb" },
    toll: { model: "/toll_gate.glb" },
    traffic: { model: "/traffic.glb" },
    light: { model: "/smart_light.glb" },
    parking: { model: "/parking.glb" },
  };

  const currentConfig = pageConfig[page];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "#080808",
        overflow: "hidden",
      }}
    >
      <Overlay setPage={setPage} activePage={page} />

      <Canvas
        shadows
        camera={{ position: [15, 10, 15], fov: 35 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#080808"]} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 20, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <pointLight position={[-10, -5, -10]} color="#00f2ff" intensity={1} />

        <Suspense fallback={null}>
          <Environment preset="city" />

          <DynamicModel modelPath={currentConfig.model} />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={20}
            blur={2}
            far={10}
          />
        </Suspense>

        <OrbitControls
          target={[0, 0, 0]}
          enableZoom={true}
          minDistance={5}
          maxDistance={500}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
