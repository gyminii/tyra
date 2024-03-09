import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { alpha, Box, Button, Paper, Popper, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePathname } from "../../../hooks/use-pathname.js";
import {useRouter} from '../../../hooks/use-router.js'
const isRouteActive = (route, currentPath, subMenu) => {
  if (route && route === currentPath) return true;
  if (subMenu) {
    for (let item of subMenu) {
      if (item.route && isRouteActive(item.route, currentPath, item.subMenu)) {
        return true;
      }
    }
  }
  return false;
};

const MenuItemComponent = ({ item, isSub }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const isActive = item.route ? isRouteActive(item.route, pathname, item.subMenu) : false;
  const placement =
    isSub && item.subMenu ? "right-start" : item.subMenu ? "bottom-start" : "bottom-start";
  const commonProps = {
    onMouseEnter: () => {
      setMenuOpen(true);
      setIsHovered(true);
    },
    onMouseLeave: () => {
      setMenuOpen(false);
      setIsHovered(false);
    },
  };
  return (
    <Box
      position="relative"
      zIndex={2}
      sx={{
        "&:hover": {
          zIndex: 3,
          "& > .MuiButton-root": {
            borderBottomLeftRadius: isSub && item.subMenu ? 6 : item.subMenu ? 0 : 6,
            borderBottomRightRadius: isSub && item.subMenu ? 6 : item.subMenu ? 0 : 6,
            zIndex: 13,
          },
        },
      }}
      {...commonProps}
      ref={anchorRef}
    >
      {isSub ? (
        <Button
          startIcon={item.icon ? item.icon : null}
          fullWidth
          endIcon={item.subMenu ? <ChevronRightTwoToneIcon fontSize="small" /> : null}
          onClick={() => item.route && router.push(item.route)}
          sx={{
            justifyContent: "space-between",
            fontWeight: 600,
            my: "1px",
            fontSize: 14,
            color: (theme) =>
              isHovered
                ? theme.palette.primary.main
                : isActive
                  ? theme.palette.primary.main
                  : theme.palette.mode === "dark"
                    ? theme.palette.neutral[500]
                    : theme.palette.neutral[800],
            backgroundColor: (theme) =>
              isHovered
                ? alpha(theme.palette.primary.main, 0.08)
                : isActive
                  ? alpha(theme.palette.primary.main, 0.08)
                  : "transparent",
          }}
        >
          {item.title}
        </Button>
      ) : (
        <Button
          endIcon={item.subMenu ? <ExpandMoreTwoToneIcon fontSize="small" /> : null}
          startIcon={item.icon ? item.icon : null}
          onClick={() => item.route && router.push(item.route)}
          {...commonProps}
          sx={{
            p: (theme) => theme.spacing(0.9, 1.5, 0.9, 1.8),
            fontSize: 14,
            borderRadius: "6px",
            mr: 1.5,
            fontWeight: 500,
            backgroundColor: (theme) =>
              isHovered
                ? theme.palette.mode === "dark"
                  ? "background.default"
                  : "background.paper"
                : isActive
                  ? theme.palette.mode === "dark"
                    ? "background.default"
                    : "transparent"
                  : "transparent",
            color: (theme) =>
              isHovered
                ? theme.palette.mode === "dark"
                  ? theme.palette.neutral[300]
                  : theme.palette.neutral[900]
                : isActive
                  ? theme.palette.mode === "dark"
                    ? theme.palette.neutral[300]
                    : theme.palette.common.white
                  : theme.palette.mode === "dark"
                    ? theme.palette.neutral[100]
                    : theme.palette.neutral[500],
            "&:hover": {
              color: (theme) =>
                isActive
                  ? theme.palette.mode === "dark"
                    ? theme.palette.common.white
                    : theme.palette.neutral[900]
                  : theme.palette.mode === "dark"
                    ? theme.palette.common.white
                    : theme.palette.neutral[900],
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "background.default" : "background.paper",
            },
          }}
        >
          {item.title ? item.title : null}
        </Button>
      )}
      {item.subMenu && (
        <Popper
          open={menuOpen}
          anchorEl={anchorRef.current}
          placement={placement}
          disablePortal
          sx={{
            zIndex: 12,
            borderRadius: 6,
          }}
        >
          <Paper
            {...commonProps}
            sx={{
              borderRadius: "6px",
              borderTopLeftRadius: isSub && item.subMenu ? 6 : item.subMenu ? 0 : 6,
              minWidth: 240,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "background.default" : "background.paper",
              maxWidth: 320,
              mt: "-1px",
              p: 2,
            }}
          >
            {item.subMenu.map((subItem, index) => (
              <MenuItemComponent key={index} item={subItem} isSub />
            ))}
          </Paper>
        </Popper>
      )}
    </Box>
  );
};
export const Menu = ({ menuItems = [] }) => {
  return (
    <>
      <Stack spacing={0} alignItems="center" flexDirection="row">
        {menuItems.map((item, index) => (
          <MenuItemComponent key={index} item={item} />
        ))}
      </Stack>
    </>
  );
};
