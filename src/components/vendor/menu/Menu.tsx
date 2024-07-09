import React, { useState, Fragment, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

/* Component Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* TS Import */
import { VendorProfileProps } from "../../../props/VendorProps";
import { addMenuList, updateMenuLoader } from "../../../store/actions";
import {
  getMenuItems,
  createHeading,
  updateHeading,
  deleteMenu,
  updateMenu,
} from "../../../services/http.services";
import { MenuProps, ItemProps, MenuDataProps } from "../../../props/MenuProps";
import { RootState } from "../../../store/reducers";

/* CSS Import */
import "./Menu.css";
import MenuList from "./MenuList";
import { URL_PET_HOME, URL_PET_MENU } from "../../../config/UrlRoute";

type Heading = {
  [id: string]: {
    title: string;
    updatedTitle: string;
    headingHash: string;
  };
};

const mapStateToProps = (state: RootState) => ({
  has_cuisine: (state.profile as VendorProfileProps)?.has_cuisine,
  vendor_id: (state.profile as VendorProfileProps)?.vendor_id,
  vendor_branch_id: (state.profile as VendorProfileProps)?.vendor_branch_id,
  menus: state.menu,
  token: state.auth.accessToken,
  profile: state.profile as VendorProfileProps,
});

const connector = connect(mapStateToProps, {
  addMenuList,
  updateMenuLoader,
});

type Props = ConnectedProps<typeof connector>;

const Menu: React.FC<Props> = (props) => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [menus, updateMenus] = useState<MenuDataProps>({
    ...(props.menus.menuData || {}),
  });
  const [headings, setHeadings] = useState<Heading>({});
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [backdropMsg, setBackdropMsg] = useState<string>(
    "Please wait for a while..."
  );
  const [searchText, setSearchText] = useState<string>("");

  const fetchMenus = (menuId: number) => {
    setShowBackdrop(true);
    setBackdropMsg("Please wait while we load...");
    getMenuItems(menuId, props.vendor_branch_id, props.token)
      .then((response) => {
        _updateHeaderAndMenu({ ...response });
        props.addMenuList({ ...response });
      })
      .catch(() => {
        setShowBackdrop(false);
        addToast("Unable to load the menu", {
          appearance: "error",
        });
        props.updateMenuLoader(true);
      });
  };

  const _updateHeaderAndMenu = (response: MenuDataProps) => {
    const menuResponse = { ...response };
    const menuHeadings: Heading = {};
    Object.keys(menuResponse).forEach((menuKey) => {
      const headingName =
        (menuResponse[menuKey as any] as MenuProps).heading_level || "";
      const headingId = (
        menuResponse[menuKey as any] as MenuProps
      ).heading_level_id.toString();
      menuHeadings[headingId] = {
        title: headingName,
        updatedTitle: headingName,
        headingHash: "",
      };
    });
    setShowBackdrop(false);
    setHeadings({ ...menuHeadings });
    updateMenus({ ...menuResponse });
  };

  const saveUpdatedHeading = (headingId: string, updatedHeading: string) => {
    if (!isNaN(+headingId) && +headingId !== -1 && updateHeading) {
      setShowBackdrop(true);
      setBackdropMsg("Please wait while updating heading...");
      updateHeading(+headingId, updatedHeading, props.token)
        .then((status) => {
          setShowBackdrop(false);
          if (status === 200) {
            setBackdropMsg("Refreshing the menu page...");
            fetchMenus(901);
            history.push(URL_PET_MENU);
          }
        })
        .catch(() => {
          addToast("Unable to update the heading", {
            appearance: "error",
          });
          setShowBackdrop(false);
        });
    } else if (+headingId === -1) {
      const oldMenus = { ...menus };
      const oldHeadings = { ...headings };
      oldMenus[headingId as any] = {
        ...oldMenus[headingId as any],
        heading_level: updatedHeading,
      };
      oldHeadings[headingId as any] = {
        ...oldHeadings[headingId as any],
        title: updatedHeading,
        updatedTitle: updatedHeading,
      };
      updateMenus({ ...oldMenus });
      setHeadings({ ...oldHeadings });
      const menuHeadingData = { ...(menus[headingId as any] as MenuProps) };
      const headingHash = menuHeadingData.heading_hash;
      const menuUrl =
        updatedHeading.split(" ").join("") + "-" + headingHash.substr(0, 10);
      history.push(`${URL_PET_MENU}${menuUrl}`);
    }
  };

  const addNewHeading = () => {
    const menuHeadings: Heading = { ...headings };
    const allMenuHeadingKeys = Object.keys(menuHeadings);
    if (!allMenuHeadingKeys.includes("-1")) {
      const oldMenus = { ...menus };
      oldMenus["-1" as any] = {
        heading_level_id: -1,
        heading_level: "New Menu",
        heading_hash: "",
        items: [
          {
            curr: "INR",
            heading_level: "New Menu",
            heading_level_id: -1,
            is_recommended: false,
            item_desc: "",
            item_end_time: "00:00",
            item_img_url: "",
            item_name: "",
            item_price: 0,
            item_start_time: "00:00",
            item_status: true,
            vendor_branch_id: props.vendor_branch_id,
            menu_type: "",
            menu_item_id: -1,
            id: -1,
            menu_id: 901,
          },
        ],
      };
      menuHeadings["-1"] = {
        title: "New Menu",
        updatedTitle: "New Menu",
        headingHash: "",
      };
      updateMenus({ ...oldMenus });
      setHeadings({ ...menuHeadings });
    } else {
      addToast("You already have unsaved item", {
        appearance: "warning",
      });
    }
  };

  const addNewSubMenu = (headingId: string) => {
    const oldMenus = { ...menus };
    const oldMenu = oldMenus[headingId as any];
    const oldItems = oldMenu.items;
    const allItemsId = oldItems.map((item) => item.id);
    if (!allItemsId.includes(-1)) {
      const item = {
        curr: "INR",
        heading_level: oldMenu.heading_level || "",
        heading_level_id: parseInt(headingId),
        is_recommended: false,
        item_desc: "",
        item_end_time: "00:00",
        item_img_url: "",
        item_name: "",
        item_price: 0,
        item_start_time: "00:00",
        item_status: true,
        vendor_branch_id: props.vendor_branch_id,
        menu_type: "",
        menu_item_id: -1,
        id: -1,
        menu_id: 901,
      };
      oldMenus[headingId as any] = {
        ...oldMenu,
        items: [...oldItems, { ...item }],
      };
      updateMenus({ ...oldMenus });
    } else {
      addToast("You already have unsaved item", {
        appearance: "warning",
      });
    }
  };

  const deleteItem = async (itemId: number) => {
    if (itemId !== -1) {
      setShowBackdrop(true);
      setBackdropMsg("Deleting in progress...");
      const deleteStatus = await deleteMenu(itemId, props.token);
      if (deleteStatus) {
        setShowBackdrop(true);
        setBackdropMsg("Refreshing the menu page...");
        fetchMenus(901);
      } else {
        addToast("Unable to delete an item", {
          appearance: "error",
        });
        setShowBackdrop(false);
      }
    } else {
      updateMenus({ ...props.menus.menuData });
    }
  };

  const saveUpdateMenuItem = async (
    itemDetails: ItemProps,
    headingId: number,
    headingTitle: string
  ) => {
    let newMenuHeadingId = -1;
    if (+headingId === -1 && headingTitle) {
      setShowBackdrop(true);
      setBackdropMsg("Please wait while we create new menu category");
      let headingCreationResponse = await createHeading(
        901,
        headingTitle,
        props.vendor_branch_id,
        props.token
      );
      if (headingCreationResponse) {
        newMenuHeadingId = +headingCreationResponse;
      }
      setShowBackdrop(false);
    }
    let httpMethod: "POST" | "PUT" = "POST";
    if (itemDetails.id !== -1) {
      httpMethod = "PUT";
    }
    setShowBackdrop(true);
    setBackdropMsg("Updation in progress...");
    const updateStatus = await updateMenu(
      httpMethod,
      itemDetails.id,
      {
        ...itemDetails,
        heading_level:
          headingId === -1 ? headingTitle : itemDetails.heading_level,
        heading_level_id:
          headingId === -1 ? newMenuHeadingId : itemDetails.heading_level_id,
      },
      props.token
    );
    if (updateStatus) {
      setShowBackdrop(true);
      setBackdropMsg("Refreshing the menu page...");
      fetchMenus(901);
      if (headingId === -1) {
        history.push(URL_PET_MENU);
      }
    } else {
      addToast("Unable to update an item", {
        appearance: "error",
      });
      setShowBackdrop(false);
    }
  };

  useEffect(() => {
    if (!props?.profile?.vendor_id) {
      history.push(URL_PET_HOME);
    } else {
      const propsMenu = { ...props.menus };
      if (!propsMenu.isDataLoaded) {
        fetchMenus(901);
      } else {
        _updateHeaderAndMenu({ ...(propsMenu.menuData || {}) });
      }
    }
  }, [props.menus.isDataLoaded]);

  return (
    <Fragment>
      {showBackdrop && <Backdrop message={backdropMsg} />}
      <Fragment>
        {/* <div style={{
                    maxHeight: '175px',
                    height: '100%',
                    width: '100%'
                }}>
                    <img src='https://www.teahub.io/photos/full/20-206697_bridge-video-game-fortnite-wallpaper-fortnite-background-1280x720.jpg' alt='banner' style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }} />
                    <div className='d-flex justify-content-center align-items-end' style={{
                        position: 'absolute',
                        height: '175px',
                        width: '100%',
                        top: 0,
                        backgroundImage: 'linear-gradient(180deg, transparent, #000000)',
                        paddingBottom: '30px'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: 'red',
                            borderRadius: '50px',
                            backgroundSize: 'contain',
                            backgroundImage: props.profile.vendor_prfl_img_url ? `url(${props.profile.vendor_prfl_img_url})` : 'none'
                        }}></div>
                    &nbsp;
                    <h2 style={{
                            color: '#F2BD00',
                            fontWeight: 600
                        }}>
                            {props.profile.vendor_name}
                        </h2>
                    </div>
                </div> */}
        <div className="d-flex flex-column h-100">
          <div className="border-bottom container-fluid px-0">
            <div className="row">
              <div className="col-md-8">
                <nav className="navbar navbar-expand-lg navbar-light bg-white p-0">
                  <div
                    className="navbar-collapse w-100 overflow-auto"
                    id="main-menu-category"
                  >
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      <NavLink
                        to={URL_PET_MENU}
                        className="nav-item text-decoration-none"
                        activeClassName="active"
                        exact
                      >
                        <span className="nav-link">All</span>
                      </NavLink>
                      {Object.keys(headings).map((headingId, headingIndex) => {
                        const headingData = headings[headingId];
                        const headingTitle = headingData.title;
                        const headingHash = headingData.headingHash;
                        const menuUrl =
                          headingTitle.split(" ").join("") +
                          "-" +
                          headingHash.substr(0, 10);
                        return (
                          <NavLink
                            key={headingIndex}
                            to={`${URL_PET_MENU}${menuUrl}`}
                            activeClassName="active"
                            className="nav-item text-decoration-none"
                            style={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span className="nav-link">{headingTitle}</span>
                          </NavLink>
                        );
                      })}
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <form className="d-flex form-inline justify-content-around m-2 w-100">
                  <input
                    type="text"
                    className="form-control rounded-pill w-50"
                    value={searchText}
                    onChange={(ev) => setSearchText(ev.target.value)}
                    placeholder="Search here"
                  />
                  <button
                    className="btn ml-2"
                    type="button"
                    style={{
                      backgroundColor: "rgb(231, 229, 242)",
                      color: "var(--dark)",
                      fontWeight: 600,
                    }}
                    onClick={addNewHeading}
                  >
                    Add heading
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="container-fluid flex-grow-1 overflow-auto mt-2">
            {/* style={{
                        marginBottom: '10rem'
                    }} */}
            <div className="row">
              <div className="col-md-12">
                {/* <MenuList
                  menus={menus}
                  filterMenu={searchText}
                  deleteMenu={deleteItem}
                  updateHeading={saveUpdatedHeading}
                  updateMenuItem={saveUpdateMenuItem}
                  addSubMenuItem={addNewSubMenu}
                  profile={props.profile}
                /> */}
              </div>
            </div>
          </div>
          <hr />
        </div>
      </Fragment>
    </Fragment>
  );
};

export default connector(Menu);
