import { Terminal as XTerminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import socket from "../../components/globals/socket";

import "@xterm/xterm/css/xterm.css";

const Terminal = () => {
  const terminalRef = useRef<any>();
  const isRendered = useRef<any>(false);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;

    const term = new XTerminal({
      rows: 20,
    });

    term.open(terminalRef.current);

    term.onData((data) => {
      socket.emit("write", data);
    });

    function onTerminalData(data:any) {
      term.write(data);
    }

    socket.on("data", onTerminalData);
  }, []);

  return <div ref={terminalRef} id="terminal" />;
};

export default Terminal;