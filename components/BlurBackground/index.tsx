export const BlurBackground = () => {
  return (
    <div className="select-none mix-blend-multiply opacity-15 pointer-events-none z-20 flex-none fixed inset-0 overflow-hidden">
      <div
        style={{
          position: "absolute",
          borderRadius: "inherit",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 120,
          backgroundRepeat: "repeat",
          backgroundPosition: "left top",
          backgroundSize: "64px auto",
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="126" height="126"><path id="a" d="M126 0v21.584L21.584 126H0v-17.585L108.415 0H126Zm0 108.414V126h-17.586L126 108.414Zm0-84v39.171L63.585 126H24.414L126 24.414Zm0 42v39.17L105.584 126h-39.17L126 66.414ZM105.586 0 0 105.586V66.415L66.415 0h39.171Zm-42 0L0 63.586V24.415L24.415 0h39.171Zm-42 0L0 21.586V0h21.586Z" fill="rgb(136, 136, 136, 0.2)" fill-rule="evenodd"/></svg>')`,
        }}
        data-framer-background-image-wrapper="true"
      ></div>
    </div>
  );
};
