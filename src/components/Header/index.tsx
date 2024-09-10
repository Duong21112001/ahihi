import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import Text from "../Text";
import React from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Button from "../Button";
import { useRequest } from "@umijs/hooks";
import { getUser } from "@/service/user";
import { UserResponse } from "@/utils/model/user";
import { useRecoilState } from "recoil";
import { initUser, userProfile } from "@/context/User";
import Tooltip from "rc-tooltip";
import Box from "../Box";
import "rc-tooltip/assets/bootstrap.css";
import { logout } from "@/service/login";
import { ROUTER } from "@/api/constant";
import Search from "../Search";
import Course from "./Course";
import Document from "../../../pages/document/Document";
import { cn } from "@/utils";
const Header = () => {
  const router = useRouter();
  const [navBarOpen, setnavBarOpen] = useState(false);
  const token = getCookie("kosei-token");
  const [fullname, setFullname] = useState("");

  const [user, setUser] = useRecoilState(userProfile);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isCourse, setIsCourse] = useState(false);
  const { loading, data }: { loading: boolean; data: UserResponse[] } =
    useRequest(
      async () => {
        if (token) {
          const result = await getUser();
          return result;
        }
      },

      {
        onSuccess: (result) => {
          setUser(result?.[0]?.user);
        },
      }
    );

  const { run: onDelete, loading: loadingLogOut } = useRequest(
    async () => {
      if (token) {
        const result = await logout();
        return result;
      }
    },

    {
      manual: true,
      onSuccess: (result: any) => {
        if (result?.code === 204) {
          deleteCookie("kosei-token");
          setUser(initUser);
          router.push(ROUTER.HOME);
        }
      },
    }
  );

  const onGoMyCourse = () => {
    router.push({
      pathname: "/my-course",
    });
    setIsShowDropdown(false);
  };
  const handleChange = () => {
    router.push({
      pathname: "history",
    });
    setIsShowDropdown(false);
  };
  const handleEdit = () => {
    router.push({
      pathname: "update-profile",
    });
    setIsShowDropdown(false);
  };
  useEffect(() => {
    setnavBarOpen(false);
  }, [router]);
  const nameUser = data?.[0]?.user?.fullname;
  const avatar = data?.[0]?.user?.avatar;
  const paths = ["/register-trial-tests", "/exams", "/exam"];
  const DropDown = () => {
    return (
      <div className={styles.dropDown}>
        <div className={styles.dropDownShadow}>
          <div className={styles.dropDownUser}>
            <Box flex agileItem="agile-center">
              <img
                // src="/svg/no-user.svg"
                // src={`https://kosei-web.eupsolution.net${avatar}`}
                src={
                  avatar
                    ? `https://kosei-web.eupsolution.net${avatar}`
                    : "/svg/no-user.svg"
                }
                alt="no-user"
                // layout="fixed"
                width={24}
                height={24}
                style={{ marginRight: 12 }}
                className="rounded-full min-w-6 h-6 object-fill"
              />
              <Text type="body-14-semibold" color="neutral-1" right={12}>
                {nameUser}
              </Text>
            </Box>
            <Image
              src="/svg/edit.svg"
              alt="edit"
              layout="fixed"
              width={20}
              height={20}
              style={{ cursor: "pointer" }}
              onClick={handleEdit}
            />
          </div>
          <Text
            type="body-16-semibold"
            color="main-color-primary"
            className={styles.course}
            onClick={onGoMyCourse}
          >
            Khoá học của tôi
          </Text>
        </div>

        <Text
          type="body-16-medium"
          color="neutral-2"
          className={styles.history}
          onClick={() => {
            if (!user?.user_id) {
              router.push("/login");
            } else {
              router.push("/history");
            }
          }}
        >
          Lịch sử thi
        </Text>
        <Text
          type="body-16-medium"
          color="sematic-1"
          className={styles.logout}
          onClick={onDelete}
        >
          Đăng xuất
        </Text>
      </div>
    );
  };
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchWidth = isSearchActive ? "100%" : "auto";

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.headerMobile}>
          <div
            className={styles.logoGroup}
            onClick={() => {
              setnavBarOpen(true);
            }}
          >
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.200195 1.5998C0.200195 1.15798 0.558367 0.799805 1.0002 0.799805H17.0002C17.442 0.799805 17.8002 1.15798 17.8002 1.5998C17.8002 2.04163 17.442 2.3998 17.0002 2.3998H1.0002C0.558367 2.3998 0.200195 2.04163 0.200195 1.5998ZM0.200195 7.9998C0.200195 7.55798 0.558367 7.1998 1.0002 7.1998H17.0002C17.442 7.1998 17.8002 7.55798 17.8002 7.9998C17.8002 8.44163 17.442 8.7998 17.0002 8.7998H1.0002C0.558367 8.7998 0.200195 8.44163 0.200195 7.9998ZM0.200195 14.3998C0.200195 13.958 0.558367 13.5998 1.0002 13.5998H17.0002C17.442 13.5998 17.8002 13.958 17.8002 14.3998C17.8002 14.8416 17.442 15.1998 17.0002 15.1998H1.0002C0.558367 15.1998 0.200195 14.8416 0.200195 14.3998Z"
                fill="#151515"
              />
            </svg>
          </div>
        </header>
        <main className={classNames({ open: navBarOpen })}>
          <div
            className={classNames(styles.containerLink, { open: navBarOpen })}
          >
            <aside className={styles.mobileNavbar}>
              <div
                className={styles.logo}
                onClick={() => {
                  router.push("/");
                }}
              >
                <Image
                  src="/Images/logo-kosei.png"
                  alt="logo"
                  layout="fixed"
                  width={120}
                  height={64}
                  unoptimized
                  quality={100}
                  style={{ objectFit: "cover" }}
                />
              </div>

              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setnavBarOpen(false);
                }}
                className={styles.closeIcon}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.58579 8L0.292893 1.70711L1.70711 0.292893L8 6.58579L14.2929 0.292893L15.7071 1.70711L9.41421 8L15.7071 14.2929L14.2929 15.7071L8 9.41421L1.70711 15.7071L0.292893 14.2929L6.58579 8Z"
                  fill="#151515"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.292893 0.292893C0.683417 -0.0976312 1.31658 -0.097631 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.097631 15.3166 -0.0976312 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683417 16.0976 0.292893 15.7071C-0.0976312 15.3166 -0.097631 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.097631 1.31658 -0.0976312 0.683417 0.292893 0.292893Z"
                  fill="#151515"
                />
              </svg>
            </aside>

            <aside className={styles.link}>
              <div className={styles.searchTop}>
                <Search width={searchWidth} />
              </div>
              {!isSearchActive && (
                <>
                  <Link href="/">
                    <Text
                      type="body-16-regular"
                      color={
                        router.pathname === "/" ? "primary-blue" : "neutral-1"
                      }
                    >
                      Trang chủ
                    </Text>
                  </Link>
                  <div className={classNames(styles.a)}>
                    <div
                      className={styles.subTitle}
                      onClick={() => setIsCourse(!isCourse)}
                    >
                      <Text
                        type="body-16-regular"
                        color={
                          router.pathname === "/course"
                            ? "primary-blue"
                            : "neutral-1"
                        }
                        right={5}
                      >
                        Khóa học
                      </Text>
                      <svg
                        width="12"
                        height="6"
                        viewBox="0 0 12 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.414376 0.531506C0.673133 0.20806 1.1451 0.155619 1.46855 0.414376L6.00003 4.03956L10.5315 0.414376C10.855 0.155619 11.3269 0.20806 11.5857 0.531506C11.8444 0.854953 11.792 1.32692 11.4685 1.58568L6.46855 5.58568C6.19464 5.80481 5.80542 5.80481 5.53151 5.58568L0.531506 1.58568C0.20806 1.32692 0.155619 0.854953 0.414376 0.531506Z"
                          fill="#090A0B"
                        />
                      </svg>
                    </div>
                    <div className={styles.position}>
                      {isCourse && <Course />}
                    </div>
                  </div>
                  <Text
                    type="body-16-regular"
                    onClick={() => {
                      const isRegistered = getCookie("isRegistered");

                      if (!user?.user_id) {
                        router.push("/login");
                      } else if (isRegistered === "true") {
                        router.push("/exam");
                      } else {
                        router.push({
                          pathname: "/register-trial-tests",
                        });
                      }
                    }}
                    className={styles.textBtn}
                    color={
                      paths.includes(router.pathname)
                        ? "primary-blue"
                        : "neutral-1"
                    }
                  >
                    Thi thử
                  </Text>
                  <div className={styles.textBtn}>
                    <Document />
                  </div>
                  <Text
                    type="body-16-regular"
                    onClick={() =>
                      router.push({
                        pathname: "/about-us",
                      })
                    }
                    className={styles.textBtn}
                    color={
                      router.pathname === "/about-us"
                        ? "primary-blue"
                        : "neutral-1"
                    }
                  >
                    Về chúng tôi
                  </Text>
                </>
              )}
              <div className={cn(styles.searchBottom)}>
                <Search
                  isSearchActive={isSearchActive}
                  setIsSearchActive={setIsSearchActive}
                  width={searchWidth}
                />
              </div>
            </aside>

            <div className={styles.menuRight}>
              {!user?.user_id && (
                <div className={styles.auth}>
                  <Link href="/register">
                    <Button type="btn-secondary" className={styles.button}>
                      <Text
                        type="body-16-semibold"
                        color="main-color-secondary"
                      >
                        Đăng kí
                      </Text>
                    </Button>
                  </Link>

                  <div className={styles.space} />
                  <Button
                    type="btn-blue"
                    className={styles.button}
                    onClick={() => router.push("/login")}
                  >
                    <Text type="body-16-semibold" color="neutral-10">
                      Đăng nhập
                    </Text>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
        {user?.user_id && (
          <div
            className={styles.user}
            onClick={() => setIsShowDropdown(!isShowDropdown)}
          >
            <img
              // src="/svg/no-user.svg"
              // src={`https://kosei-web.eupsolution.net${avatar}`}
              src={
                avatar
                  ? `https://kosei-web.eupsolution.net${avatar}`
                  : "/svg/no-user.svg"
              }
              alt="no-user"
              // layout="fixed"
              width={24}
              height={24}
              style={{ marginRight: 12 }}
              className="rounded-full min-w-6 h-6 object-fill"
            />
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "14px",
                fontWeight: "semibold",
              }}
            >
              {nameUser || fullname}
            </div>
            <Tooltip
              placement="bottomRight"
              overlay={<DropDown />}
              showArrow={false}
              trigger={["click"]}
              overlayClassName={styles.overlayClassName}
              visible={isShowDropdown}
            >
              <Image
                src="/svg/icon-down-black.svg"
                alt="icon-down"
                layout="fixed"
                width={12}
                height={6}
                style={{ cursor: "pointer", marginLeft: "12px" }}
                className={isShowDropdown ? styles.arrow : styles.arrow_open}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
