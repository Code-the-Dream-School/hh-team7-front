import React from "react";
import QRCode from "react-qr-code";
import PropTypes from "prop-types";

const QRCodeGenerator = ({
  value,
  size = 128,
  bgColor = "#ffffff",
  fgColor = "#000000",
  level = "Q",
}) => {
  if (!value) return null;

  const platformUrl = `${window.location.origin}/ProfilePage`;
  const qrValue = `${platformUrl}?qr=${encodeURIComponent(value)}`;

  return (
    <div className="qr-code-generator">
      <QRCode
        value={qrValue}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
      />
    </div>
  );
};

QRCodeGenerator.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  level: PropTypes.oneOf(["L", "M", "Q", "H"]),
};

export default QRCodeGenerator;
