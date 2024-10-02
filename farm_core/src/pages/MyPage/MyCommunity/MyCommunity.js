import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMyPosts } from "../../../store/myPageSlice/mypostSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "./MyCommunity.module.scss";

function MyCommunity() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  const { myPosts, isLoading, error } = useSelector(
    (state) => state.myPostSlice
  );
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("freeboard");

  const userEmail = userInfo?.[0]?.email;

  const formatDateToKorean = (milliseconds) => {
    if (!milliseconds) return "";

    const date = new Date(milliseconds);
    const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kroDate = new Date(utc + KR_TIME_DIFF);

    const padZero = (num) => String(num).padStart(2, "0");

    return (
      `${kroDate.getFullYear()}:${padZero(kroDate.getMonth() + 1)}:${padZero(
        kroDate.getDate()
      )} ` +
      `${padZero(kroDate.getHours())}:${padZero(
        kroDate.getMinutes()
      )}:${padZero(kroDate.getSeconds())}`
    );
  };

  const getStockTypeLabel = (type) => {
    switch (type) {
      case "koreanCow":
        return "한우";
      case "dairyCow":
        return "낙농";
      case "pork":
        return "양돈";
      case "chicken":
        return "양계";
      case "eggChicken":
        return "산란계";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (userEmail) {
      const queryOptions = {
        conditions: [
          { field: "email", operator: "==", value: userEmail },
          {
            field: "communityType",
            operator: "==",
            value: selectedCategory,
          },
        ],
      };

      dispatch(fetchMyPosts({ collectionName: "community", queryOptions }))
        .unwrap()
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [dispatch, userEmail, selectedCategory]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && (
          <>
            {/* 게시판 카테고리 선택 */}
            <FormControl className={styles.select}>
              <InputLabel>게시판</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="게시판"
                size="small"
              >
                <MenuItem value="freeboard">자유 게시판</MenuItem>
                <MenuItem value="livestock">축산 게시판</MenuItem>
              </Select>
            </FormControl>

            {/* 게시판 목록 */}
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table>
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell className={styles.tableCellHeader}>
                      번호
                    </TableCell>
                    <TableCell className={styles.tableCellHeader}>
                      제목
                    </TableCell>
                    <TableCell className={styles.tableCellHeader}>
                      사진 미리보기
                    </TableCell>
                    <TableCell className={styles.tableCellHeader}>
                      최근 수정 시간
                    </TableCell>
                    <TableCell className={styles.tableCellHeader}>
                      타입
                    </TableCell>
                    {selectedCategory === "livestock" && (
                      <TableCell className={styles.tableCellHeader}>
                        가축 유형
                      </TableCell>
                    )}
                    <TableCell className={styles.tableCellHeader}>
                      상세 보기
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {myPosts.map((post, index) => (
                    <TableRow key={post.docId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>
                        {post.imgUrl && (
                          <img
                            src={post.imgUrl}
                            alt="미리보기"
                            className={styles.imagePreview}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {formatDateToKorean(post.createdAt)}
                      </TableCell>
                      <TableCell>
                        {post.communityType === "freeboard"
                          ? "자유 게시판"
                          : "축산 게시판"}
                      </TableCell>
                      {selectedCategory === "livestock" && (
                        <TableCell>
                          {getStockTypeLabel(post.stockType)}
                        </TableCell>
                      )}
                      <TableCell>
                        <Button
                          variant="outlined"
                          className={styles.button}
                          onClick={() => handlePostClick(post)}
                        >
                          자세히 보기
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* 게시글 상세보기 다이얼로그 */}
            <Dialog
              open={Boolean(selectedPost)}
              onClose={handleCloseDetail}
              className={styles.dialog}
            >
              <DialogTitle className={styles.dialogTitle}>
                {selectedPost?.title}
              </DialogTitle>
              <DialogContent className={styles.dialogContent}>
                <div className={styles.dialogContentItem}>
                  <Typography className={styles.dialogLabel}>제목:</Typography>
                  <Typography>{selectedPost?.title}</Typography>
                </div>
                <div className={styles.dialogContentItem}>
                  <Typography className={styles.dialogLabel}>내용:</Typography>
                  <Typography>{selectedPost?.content}</Typography>
                </div>
                {selectedPost?.imgUrl && (
                  <div className={styles.dialogContentItem}>
                    <Typography className={styles.dialogLabel}>
                      이미지:
                    </Typography>
                    <img
                      src={selectedPost.imgUrl}
                      alt="게시글 이미지"
                      className={styles.dialogImage}
                    />
                  </div>
                )}
              </DialogContent>
              <DialogActions className={styles.dialogActions}>
                <Button
                  onClick={handleCloseDetail}
                  color="primary"
                  className={styles.button}
                >
                  닫기
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
      {/* <RegularPayment /> */}
    </div>
  );
}

export default MyCommunity;
