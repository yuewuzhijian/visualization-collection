/**
 * 图片处理工具-基础操作Tab页
 */
import React, { useRef, useEffect } from "react";
import { Button, message } from "antd";
import { cloneDeep } from "lodash-es";
import { useIntl } from "react-intl";
import {
  flipSideToSide,
  flipUpsideDown,
  leftRotate,
  rightRotate,
  toGrey,
  toBlackAndWhite,
  sharpen,
  marginSharpen,
  toOpposite,
  toRed,
  toGreen,
  toBlue,
  toRedAndGreen,
  toRedAndBlue,
  toBlueAndGreen,
  toRedAndGrey,
  toGreenAndGrey,
  toBlueAndGrey,
  toGaussianBlur,
  jpgToPng,
  pngToJpg,
} from "utils/imageUtil";
import FileBox from "../FileBox";
import { TabPageProps } from "../../index";
import styles from "../../index.module.scss";

interface Status {
  doing: boolean;
  imageData: ImageData | null;
}

interface ImgStatusInfo {
  flipSideToSideStatus: Status;
  flipUpsideDownStatus: Status;
  leftRotateStatus: Status;
  rightRotateStatus: Status;
  toGreyStatus: Status;
  toBlackAndWhiteStatus: Status;
  sharpenStatus: Status;
  marginSharpenStatus: Status;
  toOppositeStatus: Status;
  toRedStatus: Status;
  toGreenStatus: Status;
  toBlueStatus: Status;
  toRedAndGreenStatus: Status;
  toRedAndBlueStatus: Status;
  toBlueAndGreenStatus: Status;
  toRedAndGreyStatus: Status;
  toGreenAndGreyStatus: Status;
  toBlueAndGreyStatus: Status;
  toGaussianBlurStatus: Status;
  jpgToPngStatus: Status;
  pngToJpgStatus: Status;
}

const defaultImgStatus = {
  flipSideToSideStatus: { doing: false, imageData: null },
  flipUpsideDownStatus: { doing: false, imageData: null },
  leftRotateStatus: { doing: false, imageData: null },
  rightRotateStatus: { doing: false, imageData: null },
  toGreyStatus: { doing: false, imageData: null },
  toBlackAndWhiteStatus: { doing: false, imageData: null },
  sharpenStatus: { doing: false, imageData: null },
  marginSharpenStatus: { doing: false, imageData: null },
  toOppositeStatus: { doing: false, imageData: null },
  toRedStatus: { doing: false, imageData: null },
  toGreenStatus: { doing: false, imageData: null },
  toBlueStatus: { doing: false, imageData: null },
  toRedAndGreenStatus: { doing: false, imageData: null },
  toRedAndBlueStatus: { doing: false, imageData: null },
  toBlueAndGreenStatus: { doing: false, imageData: null },
  toRedAndGreyStatus: { doing: false, imageData: null },
  toGreenAndGreyStatus: { doing: false, imageData: null },
  toBlueAndGreyStatus: { doing: false, imageData: null },
  toGaussianBlurStatus: { doing: false, imageData: null },
  jpgToPngStatus: { doing: false, imageData: null },
  pngToJpgStatus: { doing: false, imageData: null },
};

const BasicOperation = (props: TabPageProps) => {
  const {
    imgInfo,
    exportImage,
    imgDragOver,
    onDragOver,
    onDragLeave,
    onDrop,
    onClear,
  } = props;
  const intl = useIntl();
  const imgStatusInfo = useRef<ImgStatusInfo>(cloneDeep(defaultImgStatus));

  const doTask = (
    status: Status,
    method: (imageData: ImageData) => ImageData | null,
    exportImageType?: string
  ) => {
    if (status && status.imageData) {
      exportImage(status.imageData);
    } else if (status.doing) {
      message.warning(intl.formatMessage({ id: "common.workHard" }));
      return;
    } else if (imgInfo?.imageData) {
      status.doing = true;
      let data = imgInfo.imageData;
      if (method === toGaussianBlur) {
        data = cloneDeep(data);
      }
      const newImageData = method(data);
      if (newImageData) {
        status.imageData = newImageData;
        exportImage(newImageData, exportImageType);
      } else {
        message.error(intl.formatMessage({ id: "common.operationFailure" }));
      }
      status.doing = false;
    }
  };

  useEffect(() => {
    imgStatusInfo.current = cloneDeep(defaultImgStatus);
  }, [imgInfo]);

  return (
    <div>
      <FileBox
        imgInfo={imgInfo}
        imgDragOver={imgDragOver}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      />
      <div className={styles.operationBtns}>
        <div className={styles.left}>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.flipSideToSideStatus, flipSideToSide)
            }
          >
            {intl.formatMessage({
              id: "common.flipSideToSide",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.flipUpsideDownStatus, flipUpsideDown)
            }
          >
            {intl.formatMessage({
              id: "common.flipTopToBottom",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.leftRotateStatus, leftRotate)
            }
          >
            {intl.formatMessage({ id: "common.rotateLeft" })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.rightRotateStatus, rightRotate)
            }
          >
            {intl.formatMessage({ id: "common.rotateRight" })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() => doTask(imgStatusInfo.current.toGreyStatus, toGrey)}
          >
            {intl.formatMessage({ id: "common.graying" })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(
                imgStatusInfo.current.toBlackAndWhiteStatus,
                toBlackAndWhite
              )
            }
          >
            {intl.formatMessage({ id: "common.vampix" })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() => doTask(imgStatusInfo.current.sharpenStatus, sharpen)}
          >
            {intl.formatMessage({ id: "page.imageProcessingTool.shmpch" })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.marginSharpenStatus, marginSharpen)
            }
          >
            {intl.formatMessage({
              id: "page.imageProcessingTool.edgeSharpening",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.toOppositeStatus, toOpposite)
            }
          >
            {intl.formatMessage({
              id: "page.imageProcessingTool.filterContrast",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() => doTask(imgStatusInfo.current.toRedStatus, toRed)}
          >
            {intl.formatMessage({ id: "page.imageProcessingTool.redFilter" })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() => doTask(imgStatusInfo.current.toGreenStatus, toGreen)}
          >
            {intl.formatMessage({ id: "page.imageProcessingTool.greenFilter" })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() => doTask(imgStatusInfo.current.toBlueStatus, toBlue)}
          >
            {intl.formatMessage({ id: "page.imageProcessingTool.blueFilter" })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.toRedAndGreenStatus, toRedAndGreen)
            }
          >
            {intl.formatMessage({
              id: "page.imageProcessingTool.redGreenFilter",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.toRedAndBlueStatus, toRedAndBlue)
            }
          >
            {intl.formatMessage({
              id: "page.imageProcessingTool.redBlueFilter",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.toBlueAndGreenStatus, toBlueAndGreen)
            }
          >
            {intl.formatMessage({
              id: "page.imageProcessingTool.blueGreenFilter",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.toRedAndGreyStatus, toRedAndGrey)
            }
          >
            {intl.formatMessage({
              id: "page.imageProcessingTool.redGreyFilter",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.toGreenAndGreyStatus, toGreenAndGrey)
            }
          >
            {intl.formatMessage({
              id: "page.imageProcessingTool.greenGreyFilter",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.toBlueAndGreyStatus, toBlueAndGrey)
            }
          >
            {intl.formatMessage({
              id: "page.imageProcessingTool.blueGreyFilter",
            })}
          </Button>
          <Button
            type="primary"
            className={styles.operationBtn}
            onClick={() =>
              doTask(imgStatusInfo.current.toGaussianBlurStatus, toGaussianBlur)
            }
          >
            {intl.formatMessage({
              id: "page.imageProcessingTool.gaussianBlur",
            })}
          </Button>
          {["JPG", "JPEG"].includes(imgInfo.fileType) && (
            <Button
              type="primary"
              className={styles.operationBtn}
              onClick={() =>
                doTask(imgStatusInfo.current.jpgToPngStatus, jpgToPng, "PNG")
              }
            >
              {intl.formatMessage({
                id: "page.imageProcessingTool.jpgToPng",
              })}
            </Button>
          )}
          {imgInfo.fileType === "PNG" && (
            <Button
              type="primary"
              className={styles.operationBtn}
              onClick={() =>
                doTask(imgStatusInfo.current.pngToJpgStatus, pngToJpg, "JPEG")
              }
            >
              {intl.formatMessage({
                id: "page.imageProcessingTool.pngToJpg",
              })}
            </Button>
          )}
        </div>
        <Button className={styles.right} ghost type="primary" onClick={onClear}>
          {intl.formatMessage({
            id: "common.clear",
          })}
        </Button>
      </div>
    </div>
  );
};

export default BasicOperation;
