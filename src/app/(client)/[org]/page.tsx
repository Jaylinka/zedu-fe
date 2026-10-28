"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChannelNav from "~/components/layout/sidebar/Nav";
import UseFirstChannel from "~/app/(client)/[org]/home/channels/hooks/first-channel";

const People = () => {
  const [sidebarWidth, setSidebarWidth] = useState(270);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const resizerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const params = useParams();
  const orgSlug = params.org as string;
  const { firstChannel } = UseFirstChannel();
  const [resolvingChannel, setResolvingChannel] = useState(true);

  useEffect(() => {
    const minWidth = 250;
    const maxWidth = 550;
    let startX = 0;
    let startWidth = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newWidth = startWidth + deltaX;

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "default";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      startX = e.clientX;
      if (sidebarRef.current) {
        startWidth = sidebarRef.current.offsetWidth;
      }
      document.body.style.userSelect = "none";
      document.body.style.cursor = "ew-resize";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const resizer = resizerRef.current;
    if (resizer) {
      resizer.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (resizer) {
        resizer.removeEventListener("mousedown", handleMouseDown);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLargeScreen = windowWidth >= 1024;

  // Self-heal an empty workspace route: when a user lands on /[org] with no
  // channel selected (for example after a mobile org switch where the
  // first-channel lookup exceeded resolveChannelIdForOrgSwitch's 1s budget),
  // send them to their first channel instead of stranding them on this
  // placeholder screen.
  useEffect(() => {
    let cancelled = false;

    const resolveDefaultChannel = async () => {
      const orgId = localStorage.getItem("orgId") || undefined;

      if (!orgId || !orgSlug) {
        setResolvingChannel(false);
        return;
      }

      const channelId = await firstChannel(orgId);

      if (cancelled) return;

      if (channelId) {
        router.replace(`/${orgSlug}/home/channels/${channelId}`);
        return;
      }

      setResolvingChannel(false);
    };

    void resolveDefaultChannel();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgSlug]);

  if (resolvingChannel) {
    return (
      <>
        <ChannelNav
          resizerRef={resizerRef}
          sidebarWidth={sidebarWidth}
          sidebarRef={sidebarRef}
        />
        <div
          className="mt-[60px] relative"
          style={{ marginLeft: isLargeScreen ? `${sidebarWidth + 85}px` : 0 }}
        >
          <div className="h-[80vh] flex flex-col items-center justify-center gap-3">
            <div className="size-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <p className="text-sm text-gray-500">Opening your workspace…</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ChannelNav
        resizerRef={resizerRef}
        sidebarWidth={sidebarWidth}
        sidebarRef={sidebarRef}
      />

      <div
        className={`mt-[60px] relative`}
        style={{ marginLeft: isLargeScreen ? `${sidebarWidth + 85}px` : 0 }}
      >
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <Image
            src="/image/empty-message.svg"
            width={100}
            height={100}
            className="size-20 lg:size-30"
            alt=""
            unoptimized
          />
          <h2 className="font-bold text-xl text-blue-500">Select a channel</h2>
        </div>
      </div>
    </>
  );
};
export default People;
