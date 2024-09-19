import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMyPosts } from "../../../store/myPageSlice/mypostSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Pagination } from "@mui/material";
import styles from "./MyCommunity.module.scss";
function MyCommunity() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  const { myPosts, isLoading, error } = useSelector(
    (state) => state.myPostSlice
  );
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  console.log(myPosts);
  const userEmail = userInfo?.[0]?.email; // 로그인한 사용자의 이메일 가져오기
  console.log(userEmail);
  useEffect(() => {
    if (userEmail) {
      const queryOptions = {
        conditions: [
          { field: "email", operator: "==", value: userEmail },
          {
            field: "communityType",
            operator: "in",
            value: ["freeboard", "livestock"],
          },
        ],
      };

      console.log("User Email:", userEmail); // 사용자 이메일 확인
      console.log("Query Options:", queryOptions); // 쿼리 옵션 확인

      dispatch(fetchMyPosts({ collectionName: "community", queryOptions }))
        .unwrap() //
        .then((data) => {
          console.log("Fetched Data:", data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [dispatch, userEmail]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const paginatedPosts = myPosts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className={styles.page}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>제목</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPosts.map((post, index) => (
                  <TableRow
                    key={post.docId}
                    onClick={() => handlePostClick(post)}
                    className={styles.tableRow}
                  >
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{post.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={Math.ceil(myPosts.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            className={styles.pagination}
          />
          <Dialog open={Boolean(selectedPost)} onClose={handleCloseDetail}>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">{selectedPost?.content}</Typography>
              {selectedPost?.imageUrl && (
                <img
                  src={selectedPost.imageUrl}
                  alt="게시글 이미지"
                  className={styles.image}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetail} color="primary">
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default MyCommunity;
