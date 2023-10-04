use holiday;
DELIMITER //

CREATE PROCEDURE GetPaginatedHolidays(IN _page INT, IN _size INT, IN _filter VARCHAR(255), IN _userId INT)
BEGIN
    DECLARE _offset INT;
    SET _offset = (_page - 1) * _size;

    SELECT 
        h.*,
        (SELECT COUNT(*) FROM user_holidays_holidays uhh WHERE uhh.holidaysId = h.id) as followerCount,
        (SELECT COUNT(*) FROM user_holidays_holidays uhh WHERE uhh.holidaysId = h.id AND uhh.userId = _userId) as isFollowing
    FROM 
        holidays h
    WHERE
        CASE 
            WHEN _filter = 'IS_FOLLOWING' THEN
                EXISTS (SELECT 1 FROM user_holidays_holidays uhh WHERE uhh.holidaysId = h.id AND uhh.userId = _userId)
            WHEN _filter = 'ONGOING' THEN
                h.start_date <= CURRENT_DATE AND h.end_date >= CURRENT_DATE
            WHEN _filter = 'UPCOMING' THEN
                h.start_date > CURRENT_DATE
            ELSE
                1 = 1
        END
    LIMIT _offset, _size;
END //

DELIMITER ;
