"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Theme, Content } from "@carbon/react";
import "@carbon/styles/css/styles.css";
import React from "react";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <Theme theme="g100">
        <Content>{children}</Content>
      </Theme>
    </Provider>
  );
}

