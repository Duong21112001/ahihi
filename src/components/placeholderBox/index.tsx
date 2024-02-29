import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape,
} from "react-placeholder/lib/placeholders";

interface PlaceholderBoxProps {
  children: any;
  loading: boolean;
}

const PlaceholderBox = ({ children, loading = false }: PlaceholderBoxProps) => {
  const { t } = useTranslation("common");
  const awesomePlaceholder = (
    <div className={styles.placeholderItem}>
      <RectShape
        style={{ padding: 20 }}
        color="#cbd5e0"
        className={styles.rectShape}
      />
    </div>
  );
  return (
    <div className={styles.placeholderBox}>
      <ReactPlaceholder
        ready={!loading}
        customPlaceholder={awesomePlaceholder}
        showLoadingAnimation
      >
        {children}
      </ReactPlaceholder>
    </div>
  );
};

export default PlaceholderBox;
