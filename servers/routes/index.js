const express = require('express');
const router = express.Router();

const requestOptions = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' }
};

// 사용자 프로필
router.get('/user', (req, res)=>res.json({centerName:'헬스장 이름 최대 노출 얼마나 할지 정해볼까요?'}));

router.post('/userJoin', (req, res)=> {
	var result = JSON.parse(JSON.stringify(req.body));

	return res.json(result);
});
//
// router.post('/auth/user/signup', (req, res)=> {
// 	var result = JSON.parse(JSON.stringify(req.body));
//
// 	return res.json(result);
// });

module.exports = router;
