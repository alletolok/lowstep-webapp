.topbar {
  position: sticky;
  top: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 14px;
  background: transparent;
}

.topbar__profile {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 6px 14px;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);

  font-size: 14px;
  font-weight: 500;
}

.topbar__profile img {
  width: 26px;
  height: 26px;
  border-radius: 50%;
}

.topbar__icon {
  background: none;
  border: none;
  font-size: 18px;
  opacity: 0.8;
}
