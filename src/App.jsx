import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
  Float,
  Center,
} from "@react-three/drei";

function SmartCityModel() {
  const { scene } = useGLTF("/smart_city.glb");
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <Center position={[2.5, 0, 0]}>
        <primitive object={scene} scale={2.8} rotation={[0, -Math.PI / 5, 0]} />
      </Center>
    </Float>
  );
}

const Overlay = () => (
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
        }}
      >
        <span style={{ cursor: "pointer" }}>ANALYTICS</span>
        <span style={{ cursor: "pointer" }}>INFRASTRUCTURE</span>
        <span style={{ cursor: "pointer" }}>ENERGY</span>
      </div>
    </nav>

    <div style={{ maxWidth: "500px" }}>
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

      {/* <button
        style={{
          marginTop: "35px",
          padding: "14px 35px",
          borderRadius: "4px",
          border: "1px solid #00f2ff",
          background: "rgba(0, 242, 255, 0.05)",
          color: "#00f2ff",
          cursor: "pointer",
          pointerEvents: "auto",
          fontSize: "0.9rem",
          fontWeight: "bold",
          letterSpacing: "2px",
          transition: "0.3s",
        }}
      >
        GET STARTED
      </button> */}
    </div>

    <div style={{ display: "flex", gap: "50px", pointerEvents: "auto" }}>
      {[
        { label: "Grid Status", val: "98.2%" },
        { label: "Traffic Net", val: "Smooth" },
        { label: "IoT Nodes", val: "12,402" },
      ].map((stat, i) => (
        <div key={i}>
          <div
            style={{
              fontSize: "0.75rem",
              opacity: 0.4,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {stat.label}
          </div>
          <div
            style={{ fontSize: "1.6rem", fontWeight: "bold", marginTop: "5px" }}
          >
            {stat.val}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
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
      <Overlay />

      <Canvas
        shadows
        camera={{ position: [10, 6, 10], fov: 30 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#080808"]} />
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <pointLight position={[-10, -5, -10]} color="#00f2ff" intensity={1.5} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <SmartCityModel />

          <ContactShadows
            position={[2.5, -1.8, 0]}
            opacity={0.5}
            scale={25}
            blur={2.5}
            far={10}
          />
        </Suspense>

        <OrbitControls
          target={[2.5, 0, 0]}
          enableZoom={true}
          autoRotate
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
