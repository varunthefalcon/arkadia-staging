"use client";

import { getUserDetails } from "@/lib/helper";
import { useRouter as useNavigationRouter } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AuthComp = () => {
  const navigate = useNavigationRouter();
  useEffect(() => {
    const currentURL = new URL(window.location.href);

    const customerType = getUserDetails("customerType");
    if (!customerType) {
      if (["/", "/login"].includes(currentURL.pathname)) return;
      toast.error("You are not allowed to access the page.");
      navigate.push("/");
      return;
    }
  }, []);

  return <></>;
};

export default AuthComp;
