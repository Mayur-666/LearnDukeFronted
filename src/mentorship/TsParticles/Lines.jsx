import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";


function Lines({particle}) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, []);

  return (
    <div className="absolute">
      <Particles id="Lines" options={useMemo(() => particle)} />
    </div>
  );
}

export default Lines;
