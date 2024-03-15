import React from "react";
import "./styles/loading.css";
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader";
import { DotLoader } from "react-spinners";
interface LoadingProps {
  loading: boolean;
}

export default function Loading({ loading }: LoadingProps) {
  return (
    <div className={`loading ${loading ? "active" : null}`}>
      {/* <img src={LoadingImage} /> */}
      <BarLoader
        color='#144f93'
        loading={loading}
        // size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
