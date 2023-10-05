USE holiday;
DELIMITER //
DROP PROCEDURE IF EXISTS GetPaginatedHolidays;

CREATE PROCEDURE GetPaginatedHolidays(IN _page INT, IN _size INT, IN _filter VARCHAR(255), IN _userId INT)
BEGIN
    DECLARE _offset INT;
    DECLARE _total_count INT;
    SET _offset = (_page - 1) * _size;

    -- Get total count of filtered records
    SELECT COUNT(*)
    INTO _total_count
    FROM holidays h
    WHERE
        CASE 
            WHEN _filter = 'isFollowing' THEN
                EXISTS (SELECT 1 FROM user_holidays_holidays uhh WHERE uhh.holidaysId = h.id AND uhh.userId = _userId)
            WHEN _filter = 'ongoing' THEN
                h.start_date <= CURRENT_DATE AND h.end_date >= CURRENT_DATE
            WHEN _filter = 'upcoming' THEN
                h.start_date > CURRENT_DATE
            ELSE
                1 = 1
        END;

    -- Get paginated records
    SELECT 
        h.*,
        (SELECT COUNT(*) FROM user_holidays_holidays uhh WHERE uhh.holidaysId = h.id) as followerCount,
        (SELECT COUNT(*) FROM user_holidays_holidays uhh WHERE uhh.holidaysId = h.id AND uhh.userId = _userId) as isFollowing,
        _total_count as totalCount  -- Include total count in the result set
    FROM 
        holidays h
    WHERE
        CASE 
            WHEN _filter = 'isFollowing' THEN
                EXISTS (SELECT 1 FROM user_holidays_holidays uhh WHERE uhh.holidaysId = h.id AND uhh.userId = _userId)
            WHEN _filter = 'ongoing' THEN
                h.start_date <= CURRENT_DATE AND h.end_date >= CURRENT_DATE
            WHEN _filter = 'upcoming' THEN
                h.start_date > CURRENT_DATE
            ELSE
                1 = 1
        END
    LIMIT _offset, _size;
END //

DELIMITER ;
